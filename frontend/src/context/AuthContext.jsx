import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("aarogya_user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("aarogya_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("aarogya_user");
    }
  }, [user]);

  const login = (userData) => {
    const loggedUser = {
      id: userData.id || "demo-user-01",
      name: userData.name || "Amit Sharma",
      email: userData.email || "amit@example.com",
      role: userData.role || "patient"
    };

    setUser(loggedUser);

    return loggedUser;
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
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