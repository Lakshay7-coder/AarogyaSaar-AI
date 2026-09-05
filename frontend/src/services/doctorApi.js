import api from "./api";

export const getDoctorDashboard =
  async () => {

    const response =
      await api.get(
        "/doctor/dashboard"
      );

    return response.data;
  };

export const updateDoctorSummary =
  async (
    caseId,
    doctorSummary
  ) => {

    const response =
      await api.put(
        `/doctor/cases/${caseId}/summary`,
        {
          doctorSummary
        }
      );

    return response.data;
  };

export const verifyCase =
  async (
    caseId,
    doctorSummary
  ) => {

    const response =
      await api.put(
        `/doctor/cases/${caseId}/verify`,
        {
          doctorSummary
        }
      );

    return response.data;
  };