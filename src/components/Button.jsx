import React from "react";

const Button = ({ color, text, bgColor, borderRadius, size }) => {
  return <button type="button" style={{ color, backgroundColor: bgColor, borderRadius }} className={`text-${size} p-3 cursor-pointer hover:drop-shadow-xl`}>
    {text}
  </button>

};

export default Button;
