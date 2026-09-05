import { createContext, useContext, useState } from "react";
import api from "../services/api";

const CaseContext = createContext(null);
const CASE_KEY = "aarogyasaar_case_id";

export const CaseProvider = ({ children }) => {
  const [currentCase, setCurrentCase] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const rememberCase = (caseData) => {
    if (caseData?._id) localStorage.setItem(CASE_KEY, caseData._id);
    setCurrentCase(caseData);
    return caseData;
  };

  const createCase = async () => {
    setLoading(true); setError("");
    try { return rememberCase((await api.post("/cases")).data); }
    catch (err) { setError(err.response?.data?.message || "Unable to create case"); throw err; }
    finally { setLoading(false); }
  };

  const giveConsent = async (caseId) => {
    const data = (await api.post(`/cases/${caseId}/consent`)).data;
    return rememberCase(data.case || data);
  };

  const savePatientInfo = async (caseId, data) => {
    const result = (await api.put(`/cases/${caseId}/patient-info`, data)).data;
    return rememberCase(result);
  };

  const sendResponse = async (caseId, text, language = "en") => {
    setLoading(true); setError("");
    try {
      const result = (await api.post(`/cases/${caseId}/respond`, { text, language })).data;
      rememberCase(result.case);
      return result;
    } catch (err) {
      setError(err.response?.data?.message || "AI response failed");
      throw err;
    } finally { setLoading(false); }
  };

  const generateSummary = async (caseId) => {
    const result = (await api.post(`/cases/${caseId}/summary`)).data;
    rememberCase(result.case);
    return result;
  };

  const getCase = async (caseId) => {
    setLoading(true); setError("");
    try { return rememberCase((await api.get(`/cases/${caseId}`)).data); }
    catch (err) { setError(err.response?.data?.message || "Unable to load case"); throw err; }
    finally { setLoading(false); }
  };

  const getMyCases = async () => (await api.get("/cases/my")).data;

  const uploadDocument = async (caseId, file) => {
    const formData = new FormData();
    formData.append("document", file);
    const result = (await api.post(`/documents/${caseId}/upload`, formData)).data;
    if (result.case) rememberCase(result.case);
    return result;
  };

  const verifyCase = async (caseId, doctorSummary = "") => {
    const result = (await api.put(`/doctor/cases/${caseId}/verify`, { doctorSummary })).data;
    if (result.case) rememberCase(result.case);
    return result;
  };

  const updateDoctorSummary = async (caseId, doctorSummary) => {
    const result = (await api.put(`/doctor/cases/${caseId}/summary`, { doctorSummary })).data;
    if (result.case) rememberCase(result.case);
    return result;
  };

  return (
    <CaseContext.Provider value={{
      currentCase, setCurrentCase, loading, error,
      createCase, giveConsent, savePatientInfo, sendResponse,
      generateSummary, getCase, getMyCases, uploadDocument,
      verifyCase, updateDoctorSummary
    }}>
      {children}
    </CaseContext.Provider>
  );
};

export const useCase = () => useContext(CaseContext);
export const getRememberedCaseId = () => localStorage.getItem(CASE_KEY);
