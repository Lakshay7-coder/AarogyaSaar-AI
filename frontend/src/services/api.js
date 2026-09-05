import axios from "axios";

const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/$/, ""),
  timeout: 30000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("aarogyasaar_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  if (config.data instanceof FormData) delete config.headers["Content-Type"];
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("aarogyasaar_token");
      localStorage.removeItem("aarogyasaar_user");
      localStorage.removeItem("aarogyasaar_case_id");
    }
    return Promise.reject(error);
  }
);

export default api;
