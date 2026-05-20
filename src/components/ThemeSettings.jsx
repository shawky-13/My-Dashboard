import React, { useEffect, useRef } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { BsCheck } from "react-icons/bs";
import { FiSun, FiMoon, FiRotateCcw } from "react-icons/fi";
import { Tooltip } from "@mui/material";
import { themeColors } from "../data/dummy";
import { useStateContext } from "../context/ContextProvider";

const ThemeSettings = () => {
  const {
    setColor,
    setMode,
    currentMode,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  const panelRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        // only close if clicking the backdrop itself
        if (e.target.classList.contains("theme-backdrop")) {
          setThemeSettings(false);
        }
      }
    };
    if (themeSettings) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [setThemeSettings, themeSettings]);

  if (!themeSettings) return null;

  return (
    <div className="theme-backdrop fixed inset-0 z-[9999] bg-black/20 dark:bg-black/40 backdrop-blur-[2px]">
      {/* Slide-in Panel */}
      <div
        ref={panelRef}
        className="absolute top-0 right-0 h-full w-[360px] flex flex-col
          bg-white dark:bg-[#1e2029] shadow-2xl
          animate-slide-in overflow-hidden"
        style={{ borderLeft: `3px solid ${currentColor}` }}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-700">
          <div>
            <h2 className="text-base font-semibold text-gray-800 dark:text-white tracking-tight">
              Theme Settings
            </h2>
            <p className="text-xs text-gray-400 dark:text-gray-400 mt-0.5">
              Personalize your dashboard
            </p>
          </div>
          <button
            onClick={() => setThemeSettings(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full
              text-gray-400 hover:text-gray-600 dark:hover:text-gray-200
              hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
          >
            <MdOutlineCancel className="text-lg" />
          </button>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-7">

          {/* ── Theme Color Section ── */}
          <section>
            <SectionLabel>Theme Color</SectionLabel>
            <div className="flex flex-wrap gap-3 mt-3">
              {themeColors.map((item, index) => (
                <Tooltip key={index} title={item.name} placement="top" arrow>
                  <button
                    type="button"
                    onClick={() => setColor(item.color)}
                    className="relative w-9 h-9 rounded-full cursor-pointer
                      transition-transform hover:scale-110 focus:outline-none
                      focus:ring-2 focus:ring-offset-2"
                    style={{
                      backgroundColor: item.color,
                      boxShadow:
                        item.color === currentColor
                          ? `0 0 0 3px white, 0 0 0 5px ${item.color}`
                          : "none",
                    }}
                    aria-label={`Select ${item.name} color`}
                  >
                    {item.color === currentColor && (
                      <BsCheck className="absolute inset-0 m-auto text-white text-lg" />
                    )}
                  </button>
                </Tooltip>
              ))}
            </div>

            {/* Live color preview bar */}
            <div
              className="mt-4 h-1.5 rounded-full transition-all duration-500"
              style={{ backgroundColor: currentColor }}
            />
          </section>

          {/* ── Mode Section ── */}
          <section>
            <SectionLabel>Display Mode</SectionLabel>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <ModeCard
                mode="Light"
                currentMode={currentMode}
                currentColor={currentColor}
                onClick={() => setMode("Light")}
                icon={<FiSun className="text-2xl mb-1.5 text-amber-400" />}
                bgClass="bg-gray-50"
                labelClass="text-gray-700"
              />
              <ModeCard
                mode="Dark"
                currentMode={currentMode}
                currentColor={currentColor}
                onClick={() => setMode("Dark")}
                icon={<FiMoon className="text-2xl mb-1.5 text-indigo-400" />}
                bgClass="bg-[#1a1c24]"
                labelClass="text-gray-200"
              />
            </div>
          </section>

          {/* ── Color Preview Card ── */}
          <section>
            <SectionLabel>Preview</SectionLabel>
            <div
              className="mt-3 rounded-xl p-4 text-white relative overflow-hidden"
              style={{ backgroundColor: currentColor }}
            >
              {/* decorative circle */}
              <div
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-20"
                style={{ backgroundColor: "white" }}
              />
              <div
                className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full opacity-10"
                style={{ backgroundColor: "white" }}
              />
              <p className="text-xs font-medium opacity-80 relative z-10">
                Active theme
              </p>
              <p className="text-lg font-bold relative z-10 mt-0.5">
                {currentMode} Mode
              </p>
              <p className="text-xs opacity-70 relative z-10 mt-1 font-mono">
                {currentColor.toUpperCase()}
              </p>
              {/* mini swatch row */}
              <div className="flex gap-1.5 mt-3 relative z-10">
                {["#ffffff40", "#ffffff60", "#ffffff80", "#ffffffB0", "#ffffff"].map((op, i) => (
                  <div
                    key={i}
                    className="h-2 flex-1 rounded-full"
                    style={{ backgroundColor: op }}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* ── Footer ── */}
        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700">
          <button
            type="button"
            onClick={() => {
              setColor("#1A97F5");
              setMode("Light");
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4
              rounded-xl border border-gray-200 dark:border-gray-600
              text-sm font-medium text-gray-600 dark:text-gray-300
              hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
          >
            <FiRotateCcw className="text-sm" />
            Reset to default
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        .animate-slide-in {
          animation: slide-in 0.28s cubic-bezier(0.32, 0.72, 0, 1) forwards;
        }
      `}</style>
    </div>
  );
};

/* ── Sub-components ── */

const SectionLabel = ({ children }) => (
  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
    {children}
  </p>
);

const ModeCard = ({ mode, currentMode, currentColor, onClick, icon, bgClass, labelClass }) => {
  const isActive = currentMode === mode;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center py-5 px-3 rounded-xl
        cursor-pointer transition-all duration-200 hover:scale-[1.02] focus:outline-none
        ${bgClass}`}
      style={{
        border: isActive
          ? `2px solid ${currentColor}`
          : "2px solid transparent",
        boxShadow: isActive ? `0 0 0 1px ${currentColor}22` : "none",
      }}
      aria-label={`Switch to ${mode} mode`}
    >
      {isActive && (
        <span
          className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center"
          style={{ backgroundColor: currentColor }}
        >
          <BsCheck className="text-white text-[10px]" />
        </span>
      )}
      {icon}
      <span className={`text-xs font-semibold ${labelClass}`}>{mode}</span>
    </button>
  );
};

export default ThemeSettings;
