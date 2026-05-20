import React from "react";

const Button = ({ color, text, bgColor, borderRadius, size }) => {
  const fontSizes = {
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
  };

  return (
    <button
      type="button"
      style={{
        color,
        backgroundColor: bgColor,
        borderRadius,
        fontSize: fontSizes[size] || fontSizes.md,
      }}
      className="p-3 cursor-pointer hover:drop-shadow-xl"
    >
      {text}
    </button>
  );
};

export default Button;
