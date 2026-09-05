import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); const [loading, setLoading] = useState(true);
  useEffect(() => { try { const saved = localStorage.getItem("aarogyasaar_user"); if (saved) setUser(JSON.parse(saved)); } catch { localStorage.removeItem("aarogyasaar_user"); } finally { setLoading(false); } }, []);
  const persist = ({ token, user: nextUser }) => { localStorage.setItem("aarogyasaar_token", token); localStorage.setItem("aarogyasaar_user", JSON.stringify(nextUser)); setUser(nextUser); return nextUser; };
  const login = async (email, password) => persist((await api.post("/auth/login", { email, password })).data);
  const register = async (data) => persist((await api.post("/auth/register", data)).data);
  const logout = () => { localStorage.removeItem("aarogyasaar_token"); localStorage.removeItem("aarogyasaar_user"); localStorage.removeItem("aarogyasaar_case_id"); setUser(null); };
  return <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: !!user }}>{children}</AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);
