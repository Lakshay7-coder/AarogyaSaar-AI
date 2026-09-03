import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("aarogya_user");

    if (!savedUser) return null;

    try {
      return JSON.parse(savedUser);
    } catch {
      localStorage.removeItem("aarogya_user");
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      const persistedSession = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        consentAt: user.consentAt
      };

      localStorage.setItem(
        "aarogya_user",
        JSON.stringify(persistedSession)
      );
    } else {
      localStorage.removeItem("aarogya_user");
    }
  }, [user]);

  const login = (userData) => {
    const loggedUser = {
      id: userData.id || "demo-user-01",
      name: userData.name || "Amit Sharma",
      email: userData.email || "amit@example.com",
      role: userData.role || "patient",
      age: userData.age || "",
      gender: userData.gender || "",
      phone: userData.phone || "",
      consentAt: userData.consentAt || null
    };

    setUser(loggedUser);

    return loggedUser;
  };

  const updateUser = (updates) => {
    setUser((previous) =>
      previous ? { ...previous, ...updates } : previous
    );
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("aarogya_token");
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        updateUser,
        logout,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}