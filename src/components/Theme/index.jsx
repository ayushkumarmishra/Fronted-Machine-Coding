"use client";
import React from "react";
import "./index.css";
import useTheme, { ThemeProvider } from "./useTheme";

const ThemeMode = {
  Dark: 1,
  Light: 2,
};

const ThemeClass = {
  [ThemeMode.Dark]: "dark",
  [ThemeMode.Light]: "light",
};

const ThemeSwitcher = () => {
  return (
    <>
      <ThemeProvider>
        <GrandParentComponent />
      </ThemeProvider>
    </>
  );
};

function GrandParentComponent() {
  return (
    <>
      <ParentComponent />
    </>
  );
}

function ParentComponent() {
  return (
    <>
      <ChildComponent />
    </>
  );
}

function ChildComponent() {
  const { theme, handleToggle } = useTheme();
  const text = theme === ThemeMode.Dark ? "🌞" : "🌑";
  return (
    <div className={ThemeClass[theme]}>
      <h1>Theme Switcher</h1>
      <button onClick={handleToggle}>{text}</button>
    </div>
  );
}

export default ThemeSwitcher;
