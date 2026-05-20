import React, { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext();

const initialColor = localStorage.getItem("colorMode") || "#1A97F5";
const initialMode = localStorage.getItem("themeMode") || "Light";

export const ContextProvider = ({ children }) => {
  const [themeSettings, setThemeSettings] = useState(false);
  const [currentColor, setCurrentColor] = useState(initialColor);
  const [currentMode, setCurrentMode] = useState(initialMode);
  const [isActive, setIsActive] = useState(true);
  const [activeMenu, setActiveMenu] = useState("");

  const handleClick = (menuName) => {
    setActiveMenu((currentMenu) => (currentMenu === menuName ? "" : menuName));
  };

  // Apply dark mode class on mount from saved preference
  useEffect(() => {
    if (currentMode === "Dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [currentMode]);

  // Inject CSS variable --current-color into :root so ALL components
  // can reference it via var(--current-color) without any prop drilling
  useEffect(() => {
    document.documentElement.style.setProperty("--current-color", currentColor);

    // Also derive a lighter tint (10% opacity) for hover/bg states
    document.documentElement.style.setProperty(
      "--current-color-light",
      currentColor + "1A"
    );
  }, [currentColor]);

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
  };

  const setMode = (mode) => {
    setCurrentMode(mode);
    localStorage.setItem("themeMode", mode);
    if (mode === "Dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <StateContext.Provider
      value={{
        themeSettings,
        setThemeSettings,
        currentColor,
        currentMode,
        setColor,
        setMode,
        isActive,
        setIsActive,
        activeMenu,
        setActiveMenu,
        handleClick,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
