import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("aarogya_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isCancel(error)) return Promise.reject(error);

    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      (error.request
        ? "The service is unavailable. Check your connection and try again."
        : "Something went wrong. Please try again.");

    return Promise.reject(Object.assign(error, { userMessage: message }));
  }
);

export const createRequestController = () =>
  new AbortController();

export const isRequestCancelled = (error) =>
  axios.isCancel(error) || error?.code === "ERR_CANCELED";

export const getApiErrorMessage = (error) =>
  error?.userMessage || "Something went wrong. Please try again.";

export const authAPI = {
  login: (data, config) => api.post("/auth/login", data, config),
  register: (data, config) => api.post("/auth/register", data, config)
};

export const caseAPI = {
  create: (data) => api.post("/cases", data),
  getAll: (config) => api.get("/cases", config),
  getById: (id, config) => api.get(`/cases/${id}`, config),
  update: (id, data, config) => api.put(`/cases/${id}`, data, config),
  verify: (id, config) => api.patch(`/cases/${id}/verify`, null, config)
};

export const aiAPI = {
  askQuestion: (data, config) => api.post("/ai/adaptive-question", data, config),
  extractSymptoms: (data, config) => api.post("/ai/extract-symptoms", data, config),
  detectRedFlags: (data, config) => api.post("/ai/red-flags", data, config),
  generateSummary: (data, config) => api.post("/ai/summary", data, config),
  translate: (data, config) => api.post("/ai/translate", data, config)
};

export const documentAPI = {
  upload: (formData, config) =>
    api.post("/documents/upload", formData, {
      ...config,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }),

  getAll: (caseId, config) => api.get(`/documents/case/${caseId}`, config)
};

export default api;