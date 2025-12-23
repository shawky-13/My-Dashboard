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
  let activeMenu = true;
  return (
    <>
      <Router>
        <div className="App">
          <Container maxWidth="sm">
            {/* main div off the app */}
            <div className="flex relative dark:bg-main-dark-bg">
              {/* div under is for setting tooltip component  */}
              <div className="fixed bottom-5 right-5">
                <Tooltip title="Settings" placement="top">
                  <IconButton style={{ zIndex: "1000" }}>
                    <FiSettings className="text-6xl rounded-full duration-300 text-white p-3 bg-amber-400 hover:text-light-gray hover:shadow" />
                  </IconButton>
                </Tooltip>
              </div>
              {/*
              here is a note that when activeMenu equal to true sidebar component
              will be shown with width 240px else it will be hidden
               */}
              {activeMenu ? (
                <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                  <Sidebar />
                </div>
              ) : (
                <div className="w-0 dark:bg-secondary-dark-bg">
                  <Sidebar />
                </div>
              )}
            </div>
          </Container>
        </div>
      </Router>
    </>
  );
}

export default App;
