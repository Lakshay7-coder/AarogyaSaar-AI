import { useState } from "react";
import { ShieldCheck, Lock, BrainCircuit, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCase } from "../context/CaseContext";

function Consent() {
  const navigate = useNavigate(); const { createCase, giveConsent, savePatientInfo, loading } = useCase();
  const [accepted, setAccepted] = useState(false); const [error, setError] = useState("");
  const continueFlow = async () => {
    if (!accepted) { setError("Please confirm your consent before continuing."); return; }
    setError("");
    try { const c = await createCase(); await giveConsent(c._id); const pending = JSON.parse(localStorage.getItem("aarogyasaar_pending_patient") || "{}"); if (Object.keys(pending).length) await savePatientInfo(c._id, pending); localStorage.removeItem("aarogyasaar_pending_patient"); navigate(`/case/${c._id}`); }
    catch (err) { setError(err.response?.data?.message || "Could not create the case. Please check that the backend and database are running."); }
  };
  return <div className="consent-page"><div className="consent-container"><div className="consent-icon"><ShieldCheck size={32}/></div><span className="form-eyebrow">STEP 2 · INFORMED CONSENT</span><h1>Your health story,<br/><span>your control.</span></h1><p className="consent-intro">AarogyaSaar AI will ask questions about your current health concerns and organise your responses for doctor review.</p><div className="consent-points"><div><BrainCircuit size={20}/><div><strong>AI-assisted conversation</strong><p>AI helps ask relevant follow-up questions based on your responses.</p></div></div><div><Lock size={20}/><div><strong>Your information stays protected</strong><p>Your case information is processed for the healthcare workflow.</p></div></div><div><ShieldCheck size={20}/><div><strong>Doctor remains the final authority</strong><p>AI does not replace diagnosis or professional clinical judgement.</p></div></div></div><label className="consent-checkbox"><input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)}/><span>I understand and consent to AI-assisted case taking and processing of my responses for healthcare purposes.</span></label>{error && <div className="form-error">{error}</div>}<button className="hero-primary full-width" onClick={continueFlow} disabled={loading}>{loading ? "Creating your case…" : <>I Understand & Continue <ArrowRight size={18}/></>}</button><button className="text-button" onClick={() => navigate("/")}>Cancel</button></div></div>;
}
export default Consent;
