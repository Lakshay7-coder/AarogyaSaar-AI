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

export const authAPI = {
  login: (data) => api.post("/auth/login", data),
  register: (data) => api.post("/auth/register", data)
};

export const caseAPI = {
  create: (data) => api.post("/cases", data),
  getAll: () => api.get("/cases"),
  getById: (id) => api.get(`/cases/${id}`),
  update: (id, data) => api.put(`/cases/${id}`, data),
  verify: (id) => api.patch(`/cases/${id}/verify`)
};

export const aiAPI = {
  askQuestion: (data) => api.post("/ai/adaptive-question", data),
  extractSymptoms: (data) => api.post("/ai/extract-symptoms", data),
  detectRedFlags: (data) => api.post("/ai/red-flags", data),
  generateSummary: (data) => api.post("/ai/summary", data),
  translate: (data) => api.post("/ai/translate", data)
};

export const documentAPI = {
  upload: (formData) =>
    api.post("/documents/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }),

  getAll: (caseId) => api.get(`/documents/case/${caseId}`)
};

export default api;