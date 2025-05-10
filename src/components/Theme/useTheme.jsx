import React, { createContext, useContext, useEffect } from "react";
import "./index.css";

const ThemeMode = {
  Dark: 1,
  Light: 2,
};

const ThemeClass = {
  [ThemeMode.Dark]: "dark",
  [ThemeMode.Light]: "light",
};

const ThemeContext = createContext({ theme: 1, handleToggle: () => {} });

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = React.useState(ThemeMode.Light);

  useEffect(() => {
    addThemeClass(ThemeClass[theme], undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addThemeClass = (className, removeClassName) => {
    const body = document.getElementsByTagName("body")[0];
    removeThemeClassFromBody(body, removeClassName);
    body.classList.add(className);
  };

  function removeThemeClassFromBody(body, className) {
    if (!className) return;
    body.classList.remove(className);
  }

  const handleToggle = () => {
    const removeClassName = ThemeClass[theme];
    const newThemeMode =
      theme === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light;
    setTheme(newThemeMode);
    addThemeClass(ThemeClass[newThemeMode], removeClassName);
  };

  return (
    <>
      <ThemeContext.Provider value={{ theme, handleToggle }}>
        {children}
      </ThemeContext.Provider>
    </>
  );
};

export { ThemeProvider };

export default function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
