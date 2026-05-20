import React, { useState } from "react";

// ✅ react-color provides many different picker styles
// we import 4 different ones to give the user options
import { ChromePicker, SketchPicker, HuePicker, TwitterPicker } from "react-color";

import Header from "../components/Header";

const ColorPicker = () => {

  // ✅ the currently selected color stored as a hex string
  const [color, setColor] = useState("#03C9D7");

  // ✅ which picker style is active — chrome, sketch, hue, or twitter
  const [pickerType, setPickerType] = useState("chrome");

  // ✅ list of saved colors the user has collected
  const [savedColors, setSavedColors] = useState([
    "#03C9D7", "#1A97F5", "#7352FF",
    "#FF5C8E", "#FB9678", "#1E4DB7",
  ]);

  // ✅ copied state for the copy button feedback
  const [copied, setCopied] = useState(false);

  // ✅ runs every time the user picks a new color
  // react-color passes a color object with many formats
  const handleChange = (colorResult) => {
    // colorResult.hex gives us the hex string like "#03C9D7"
    setColor(colorResult.hex);
  };

  // ✅ saves the current color to the saved colors list
  const handleSaveColor = () => {
    // prevent duplicate colors from being saved
    if (!savedColors.includes(color)) {
      setSavedColors((prev) => [...prev, color]);
    }
  };

  // ✅ removes a color from the saved list
  const handleRemoveColor = (colorToRemove) => {
    setSavedColors((prev) => prev.filter((c) => c !== colorToRemove));
  };

  // ✅ copies the hex color to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    // reset "Copied!" text back to "Copy" after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };

  // ✅ converts hex color to RGB format
  // used to show the RGB value below the hex value
  const hexToRgb = (hex) => {
    // remove the # symbol
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return "rgb(0, 0, 0)";
    return `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`;
  };

  // ✅ converts hex to HSL format
  const hexToHsl = (hex) => {
    // remove # and parse to RGB first
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s;
    const l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic (gray)
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
        default: h = 0;
      }
    }
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  // ✅ determines if text on the color should be black or white
  // based on the brightness of the background color
  const getTextColor = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    // formula for perceived brightness
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "#1e293b" : "#ffffff";
  };

  // ✅ predefined palette — quick color choices
  const palette = [
    "#ef4444", "#f97316", "#eab308", "#22c55e",
    "#14b8a6", "#03C9D7", "#3b82f6", "#6366f1",
    "#8b5cf6", "#ec4899", "#1e293b", "#ffffff",
  ];

  // button style
  const btnStyle = (active = false) => ({
    padding: "6px 14px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    background: active ? "#3b82f6" : "#f1f5f9",
    color: active ? "white" : "#475569",
    transition: "all 0.2s",
  });

  // ✅ renders the correct picker based on pickerType state
  const renderPicker = () => {
    // all pickers share the same color and onChange
    const pickerProps = {
      color: color,
      onChange: handleChange,
    };

    switch (pickerType) {
      case "chrome":
        // ChromePicker — full featured with hex, rgb, hsl inputs and opacity
        return <ChromePicker {...pickerProps} />;
      case "sketch":
        // SketchPicker — compact with predefined swatches
        return <SketchPicker {...pickerProps} />;
      case "hue":
        // HuePicker — just a horizontal hue slider
        return (
          <div style={{ width: "100%", padding: "10px 0" }}>
            <HuePicker
              {...pickerProps}
              width="100%"
            />
          </div>
        );
      case "twitter":
        // TwitterPicker — a simple grid of preset colors
        return <TwitterPicker {...pickerProps} />;
      default:
        return <ChromePicker {...pickerProps} />;
    }
  };

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header title="Color Picker" category="App" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
        }}
      >

        {/* ===== LEFT COLUMN — Picker ===== */}
        <div>

          {/* Picker type selector buttons */}
          <div
            style={{
              display: "flex",
              gap: "6px",
              marginBottom: "16px",
              flexWrap: "wrap",
            }}
          >
            <button style={btnStyle(pickerType === "chrome")} onClick={() => setPickerType("chrome")}>Chrome</button>
            <button style={btnStyle(pickerType === "sketch")} onClick={() => setPickerType("sketch")}>Sketch</button>
            <button style={btnStyle(pickerType === "hue")} onClick={() => setPickerType("hue")}>Hue</button>
            <button style={btnStyle(pickerType === "twitter")} onClick={() => setPickerType("twitter")}>Twitter</button>
          </div>

          {/* The active color picker */}
          <div style={{ marginBottom: "20px" }}>
            {renderPicker()}
          </div>

          {/* Quick palette */}
          <div style={{ marginBottom: "20px" }}>
            <p style={{ fontSize: "13px", fontWeight: "500", color: "#64748b", marginBottom: "10px" }}>
              Quick palette
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {palette.map((c) => (
                <div
                  key={c}
                  onClick={() => setColor(c)}
                  title={c}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    background: c,
                    cursor: "pointer",
                    border: color === c
                      ? "3px solid #3b82f6"
                      : "2px solid #e2e8f0",
                    transition: "transform 0.15s, border 0.15s",
                    transform: color === c ? "scale(1.15)" : "scale(1)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Hex input — type a color directly */}
          <div>
            <p style={{ fontSize: "13px", fontWeight: "500", color: "#64748b", marginBottom: "8px" }}>
              Type a hex color
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="text"
                value={color}
                onChange={(e) => {
                  const val = e.target.value;
                  // only update if it looks like a valid hex color
                  if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                    setColor(val);
                  }
                }}
                style={{
                  flex: 1,
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  fontSize: "14px",
                  fontFamily: "monospace",
                  outline: "none",
                  color: "#1e293b",
                }}
              />
              {/* Small color preview box next to input */}
              <div
                style={{
                  width: "40px",
                  borderRadius: "8px",
                  background: color,
                  border: "1px solid #e2e8f0",
                }}
              />
            </div>
          </div>
        </div>

        {/* ===== RIGHT COLUMN — Preview & Info ===== */}
        <div>

          {/* Large color preview card */}
          <div
            style={{
              background: color,
              borderRadius: "16px",
              height: "180px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "16px",
              boxShadow: `0 8px 32px ${color}66`,
              transition: "background 0.3s, box-shadow 0.3s",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Inner glow effect */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), transparent)",
              }}
            />
            <span
              style={{
                fontSize: "28px",
                fontWeight: "700",
                color: getTextColor(color),
                letterSpacing: "2px",
                fontFamily: "monospace",
                zIndex: 1,
              }}
            >
              {color.toUpperCase()}
            </span>
            <span
              style={{
                fontSize: "13px",
                color: getTextColor(color),
                opacity: 0.8,
                zIndex: 1,
                marginTop: "4px",
              }}
            >
              {hexToRgb(color)}
            </span>
          </div>

          {/* Color format info cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "10px",
              marginBottom: "16px",
            }}
          >
            {/* HEX value */}
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                padding: "12px",
                textAlign: "center",
              }}
            >
              <p style={{ fontSize: "10px", color: "#94a3b8", fontWeight: "500", marginBottom: "4px" }}>HEX</p>
              <p style={{ fontSize: "12px", color: "#1e293b", fontWeight: "600", fontFamily: "monospace" }}>
                {color.toUpperCase()}
              </p>
            </div>

            {/* RGB value */}
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                padding: "12px",
                textAlign: "center",
              }}
            >
              <p style={{ fontSize: "10px", color: "#94a3b8", fontWeight: "500", marginBottom: "4px" }}>RGB</p>
              <p style={{ fontSize: "11px", color: "#1e293b", fontWeight: "600", fontFamily: "monospace" }}>
                {hexToRgb(color)}
              </p>
            </div>

            {/* HSL value */}
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                padding: "12px",
                textAlign: "center",
              }}
            >
              <p style={{ fontSize: "10px", color: "#94a3b8", fontWeight: "500", marginBottom: "4px" }}>HSL</p>
              <p style={{ fontSize: "11px", color: "#1e293b", fontWeight: "600", fontFamily: "monospace" }}>
                {hexToHsl(color)}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
            <button
              onClick={handleCopy}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid #e2e8f0",
                cursor: "pointer",
                fontWeight: "500",
                fontSize: "13px",
                background: copied ? "#22c55e" : "#3b82f6",
                color: "white",
                transition: "background 0.3s",
              }}
            >
              {copied ? "Copied!" : "Copy HEX"}
            </button>
            <button
              onClick={handleSaveColor}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                fontWeight: "500",
                fontSize: "13px",
                background: savedColors.includes(color) ? "#f1f5f9" : "#f8fafc",
                color: savedColors.includes(color) ? "#94a3b8" : "#1e293b",
                transition: "all 0.2s",
              }}
            >
              {savedColors.includes(color) ? "Already Saved" : "Save Color"}
            </button>
          </div>

          {/* Gradient preview using the selected color */}
          <div style={{ marginBottom: "20px" }}>
            <p style={{ fontSize: "13px", fontWeight: "500", color: "#64748b", marginBottom: "10px" }}>
              Gradient preview
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {/* Left to right gradient */}
              <div
                style={{
                  height: "40px",
                  borderRadius: "8px",
                  background: `linear-gradient(to right, #000000, ${color})`,
                }}
              />
              {/* Color to white */}
              <div
                style={{
                  height: "40px",
                  borderRadius: "8px",
                  background: `linear-gradient(to right, ${color}, #ffffff)`,
                }}
              />
              {/* Diagonal gradient */}
              <div
                style={{
                  height: "40px",
                  borderRadius: "8px",
                  background: `linear-gradient(135deg, ${color}, #1e293b)`,
                }}
              />
            </div>
          </div>

          {/* Saved colors section */}
          {savedColors.length > 0 && (
            <div>
              <p style={{ fontSize: "13px", fontWeight: "500", color: "#64748b", marginBottom: "10px" }}>
                Saved colors ({savedColors.length})
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {savedColors.map((c, index) => (
                  <div
                    key={index}
                    style={{ position: "relative" }}
                    title={c}
                  >
                    {/* Clicking the circle sets it as the active color */}
                    <div
                      onClick={() => setColor(c)}
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "8px",
                        background: c,
                        cursor: "pointer",
                        border: color === c
                          ? "3px solid #3b82f6"
                          : "2px solid #e2e8f0",
                        transition: "transform 0.15s",
                        transform: color === c ? "scale(1.1)" : "scale(1)",
                      }}
                    />
                    {/* Small X button to remove from saved */}
                    <div
                      onClick={() => handleRemoveColor(c)}
                      style={{
                        position: "absolute",
                        top: "-6px",
                        right: "-6px",
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        background: "#ef4444",
                        color: "white",
                        fontSize: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        fontWeight: "700",
                        lineHeight: 1,
                      }}
                    >
                      ×
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ColorPicker;


/*

LibraryWhy chosenreact-colorThe most popular color picker library for React with 9k+ GitHub stars. Provides 13 different picker styles out of the box. Free, no license fees, works perfectly with React 18 and 19

The 4 picker types explained:
PickerWhat it looks likeChromePickerFull featured — saturation box, hue slider, opacity slider, hex/rgb/hsl inputsSketchPickerCompact — saturation box, hue slider, hex input, predefined color swatchesHuePickerMinimal — just a single horizontal hue slider barTwitterPickerSimple — a grid of preset color dots

Full story of how the key functions work:
hexToRgb uses a regex /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i to capture 3 groups of 2 hex characters — one for each of red, green, and blue. parseInt(result[1], 16) converts each hex pair from base-16 to a regular decimal number between 0 and 255.
hexToHsl first converts hex to RGB values between 0 and 1, then finds the max and min channel values. The difference between max and min is the saturation. Lightness is the average of max and min. Hue is calculated differently depending on which channel is the max — red, green, or blue each use a different formula.
getTextColor calculates perceived brightness using the formula (r × 299 + g × 587 + b × 114) / 1000. The different weights for each channel reflect how human eyes perceive brightness — we see green as brightest, then red, then blue. If brightness is above 128 (out of 255) the background is considered light so dark text is returned, otherwise white text.
handleDownload in the Editor and setCopied with setTimeout here are the same pattern — both use browser built-in APIs without any extra library. The setTimeout(() => setCopied(false), 2000) resets the button text from "Copied!" back to "Copy HEX" after 2 seconds automatically.

*/
