import {
  createContext,
  useContext,
  useState
} from "react";
import { demoCase } from "../data/demoData";
import { useAuth } from "./AuthContext";

const CaseContext = createContext();

export function CaseProvider({ children }) {
  const { user } = useAuth();
  const [casesByUser, setCasesByUser] = useState({});
  const [activeCaseId, setActiveCaseId] = useState(demoCase.id);
  const userId = user?.id;

  const createUserCase = (profile) => ({
    ...demoCase,
    patient: {
      ...demoCase.patient,
      name: profile?.name || demoCase.patient.name,
      age: profile?.age || demoCase.patient.age,
      gender: profile?.gender || demoCase.patient.gender,
      phone: profile?.phone || demoCase.patient.phone
    },
    symptoms: [...demoCase.symptoms],
    timeline: [...demoCase.timeline],
    documents: [...demoCase.documents]
  });

  const caseData =
    casesByUser[userId]?.[activeCaseId] || createUserCase(user);

  const updateCase = (updates) => {
    if (!userId) return;

    setCasesByUser((previousCases) => {
      const previous =
        previousCases[userId]?.[activeCaseId] || createUserCase(user);
      const resolvedUpdates =
        typeof updates === "function"
          ? updates(previous)
          : updates;

      return {
        ...previousCases,
        [userId]: {
          ...(previousCases[userId] || {}),
          [activeCaseId]: {
            ...previous,
            ...resolvedUpdates
          }
        }
      };
    });
  };

  const addSymptom = (symptom) => {
    updateCase((previous) => ({
      symptoms: [...previous.symptoms, symptom]
    }));
  };

  const addTimelineEvent = (event) => {
    updateCase((previous) => ({
      timeline: [...previous.timeline, event]
    }));
  };

  return (
    <CaseContext.Provider
      value={{
        caseData,
        setCaseData: updateCase,
        activeCaseId,
        selectCase: setActiveCaseId,
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