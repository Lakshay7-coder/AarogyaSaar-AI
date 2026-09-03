import { createContext, useContext, useState } from "react";
import { demoCase } from "../data/demoData";

const CaseContext = createContext();

export function CaseProvider({ children }) {
  const [caseData, setCaseData] = useState(demoCase);

  const updateCase = (updates) => {
    setCaseData((previous) => ({
      ...previous,
      ...updates
    }));
  };

  const addSymptom = (symptom) => {
    setCaseData((previous) => ({
      ...previous,
      symptoms: [...previous.symptoms, symptom]
    }));
  };

  const addTimelineEvent = (event) => {
    setCaseData((previous) => ({
      ...previous,
      timeline: [...previous.timeline, event]
    }));
  };

  return (
    <CaseContext.Provider
      value={{
        caseData,
        setCaseData,
        updateCase,
        addSymptom,
        addTimelineEvent
      }}
    >
      {children}
    </CaseContext.Provider>
  );
}

export function useCase() {
  return useContext(CaseContext);
}