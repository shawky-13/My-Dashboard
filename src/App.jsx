import React, { useState, useEffect } from "react";
// import React-router libraries to create a dashboard with multiple pages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import icons from react-icons
import { FiSettings } from "react-icons/fi";
//This is a MUI (Material-UI) component that provides tooltip functionality.
import { Container, Tooltip, IconButton } from "@mui/material";
// Import components
import Sidebar from "./components/Sidebar";
// import CSS file
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Container maxWidth="sm">
            <div className="flex relative dark:bg-main-dark-bg">
              <div className="fixed bottom-5 right-5">
                <Tooltip title="Settings" placement="top">
                  <IconButton style={{ zIndex: "1000" }}>
                    <FiSettings className="text-6xl rounded-full duration-300 text-white p-3 bg-amber-400 hover:text-light-gray hover:shadow" />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
            <Sidebar />
          </Container>
        </div>
      </Router>
    </>
  );
}

export default App;
