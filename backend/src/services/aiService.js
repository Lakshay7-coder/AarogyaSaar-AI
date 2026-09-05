const axios = require("axios");

const AI_URL =
  process.env.AI_SERVICE_URL ||
  "http://127.0.0.1:8000";

exports.analyzeResponse = async ({
  text,
  language,
  conversation
}) => {
  try {
    const response = await axios.post(
      `${AI_URL}/analyze-response`,
      {
        text,
        language,
        conversation
      },
      {
        timeout: 30000
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "AI service unavailable:",
      error.message
    );

    return {
      symptoms: [],
      redFlags: [],
      nextQuestion:
        "Could you tell me more about this problem?",
      completeness: 20,
      aiUnavailable: true
    };
  }
};

exports.generateClinicalSummary = async (
  caseData
) => {
  try {
    const response = await axios.post(
      `${AI_URL}/generate-summary`,
      {
        patientInfo: caseData.patientInfo,
        conversation: caseData.conversation,
        symptoms: caseData.extractedSymptoms,
        redFlags: caseData.redFlags,
        timeline: caseData.timeline
      },
      {
        timeout: 30000
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Summary service unavailable:",
      error.message
    );

    return {
      chiefComplaint:
        caseData.conversation?.[0]?.text ||
        "Not available",

      history:
        "AI service temporarily unavailable.",

      symptoms:
        caseData.extractedSymptoms.map(
          item => item.name
        ),

      redFlags:
        caseData.redFlags.map(
          item => item.title
        ),

      documents: [],

      suggestedQuestions: []
    };
  }
};