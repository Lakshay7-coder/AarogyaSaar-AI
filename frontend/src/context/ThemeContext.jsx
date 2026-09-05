import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const themes = [
  { id: "clinical", label: "Clinical teal" },
  { id: "ocean", label: "Ocean blue" },
  { id: "botanical", label: "Botanical green" },
  { id: "warm", label: "Warm amber" },
  { id: "contrast", label: "High contrast" }
];

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("aarogya_theme") || "clinical"
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("aarogya_theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
