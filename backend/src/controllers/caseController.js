const mongoose = require("mongoose");
const Case = require("../models/Case");
const aiService = require("../services/aiService");

const validId = (id) => mongoose.Types.ObjectId.isValid(id);

exports.createCase = async (req, res) => {
  try {
    const newCase = await Case.create({ patient: req.user._id, status: "draft", timeline: [{ title: "Patient registered", description: "Patient case created.", date: new Date(), source: "system" }] });
    res.status(201).json(newCase);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.grantConsent = async (req, res) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ message: "Invalid case ID" });
    const caseData = await Case.findOne({ _id: req.params.id, patient: req.user._id });
    if (!caseData) return res.status(404).json({ message: "Case not found" });
    caseData.consent = { granted: true, timestamp: new Date() }; caseData.status = "in_progress";
    caseData.timeline.push({ title: "Consent recorded", description: "Patient consented to AI-assisted case taking.", date: new Date(), source: "consent" });
    await caseData.save(); res.json({ message: "Consent recorded", case: caseData });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.addPatientInfo = async (req, res) => {
  try {
    const caseData = await Case.findOne({ _id: req.params.id, patient: req.user._id });
    if (!caseData) return res.status(404).json({ message: "Case not found" });
    const { age, gender, phone, address } = req.body;
    caseData.patientInfo = { ...caseData.patientInfo?.toObject?.(), ...(age !== undefined ? { age: Number(age) } : {}), ...(gender ? { gender } : {}), ...(phone ? { phone } : {}), ...(address ? { address } : {}) };
    await caseData.save(); res.json(caseData);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.addResponse = async (req, res) => {
  try {
    const { text, language = "en" } = req.body;
    if (!text || !String(text).trim()) return res.status(400).json({ message: "Response text is required" });
    const caseData = await Case.findOne({ _id: req.params.id, patient: req.user._id });
    if (!caseData) return res.status(404).json({ message: "Case not found" });
    if (!caseData.consent?.granted) return res.status(403).json({ message: "Consent is required before answering questions" });
    const cleanText = String(text).trim();
    caseData.conversation.push({ speaker: "patient", text: cleanText, language });
    const aiResult = await aiService.analyzeResponse({ text: cleanText, language, conversation: caseData.conversation });
    for (const symptom of aiResult.symptoms || []) {
      const exists = caseData.extractedSymptoms.some((s) => s.name === symptom.name && s.bodyPart === symptom.bodyPart);
      if (!exists) caseData.extractedSymptoms.push(symptom);
    }
    for (const flag of aiResult.redFlags || []) {
      const exists = caseData.redFlags.some((f) => f.title === flag.title);
      if (!exists) caseData.redFlags.push(flag);
    }
    if (aiResult.nextQuestion && caseData.adaptiveQuestions.at(-1) !== aiResult.nextQuestion) { caseData.adaptiveQuestions.push(aiResult.nextQuestion); caseData.conversation.push({ speaker: "ai", text: aiResult.nextQuestion, language }); }
    caseData.completeness = Number.isFinite(aiResult.completeness) ? aiResult.completeness : caseData.completeness;
    caseData.status = "in_progress";
    caseData.timeline.push({ title: "History response recorded", description: cleanText.slice(0, 160), date: new Date(), source: "conversation" });
    await caseData.save();
    res.json({ patientResponse: cleanText, extracted: aiResult, case: caseData });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getCase = async (req, res) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ message: "Invalid case ID" });
    const caseData = await Case.findById(req.params.id).populate("patient", "name email").populate("doctor", "name email");
    if (!caseData) return res.status(404).json({ message: "Case not found" });
    const isOwner = String(caseData.patient?._id) === String(req.user._id);
    const isDoctor = ["doctor", "admin"].includes(req.user.role);
    if (!isOwner && !isDoctor) return res.status(403).json({ message: "Access denied" });
    res.json(caseData);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getMyCases = async (req, res) => {
  try { res.json(await Case.find({ patient: req.user._id }).sort({ createdAt: -1 })); }
  catch (error) { res.status(500).json({ message: error.message }); }
};

exports.generateSummary = async (req, res) => {
  try {
    const caseData = await Case.findById(req.params.id);
    if (!caseData) return res.status(404).json({ message: "Case not found" });
    const isOwner = String(caseData.patient) === String(req.user._id); const isDoctor = ["doctor", "admin"].includes(req.user.role);
    if (!isOwner && !isDoctor) return res.status(403).json({ message: "Access denied" });
    const summary = await aiService.generateClinicalSummary(caseData);
    caseData.aiSummary = summary; if (isOwner && caseData.status !== "verified") caseData.status = "awaiting_review";
    caseData.timeline.push({ title: "Clinical summary generated", description: "AI-generated case summary prepared for review.", date: new Date(), source: "ai" });
    await caseData.save(); res.json({ summary, case: caseData });
  } catch (error) { res.status(500).json({ message: error.message }); }
};
