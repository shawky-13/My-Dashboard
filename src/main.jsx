import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// import ContextProvider to wrap the App component
import { ContextProvider } from "./context/ContextProvider";

// wrap App component with ContextProvider to provide context to the entire app

createRoot(document.getElementById("root")).render(
  // note: ContextProvider component is for providing context to the entire app
  <StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
    ,
  </StrictMode>,
);

// in main.jsx file we import :
/*
    - strictMode
    - createRoot from react-dom/client
    - index.css for styling
    - App component from App.jsx

    Then we create a root using createRoot and render the App component wrapped in StrictMode.



*/
