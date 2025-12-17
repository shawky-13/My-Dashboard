import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// in main.jsx file we import :
/*
    - strictMode
    - createRoot from react-dom/client
    - index.css for styling
    - App component from App.jsx

    Then we create a root using createRoot and render the App component wrapped in StrictMode.



*/
