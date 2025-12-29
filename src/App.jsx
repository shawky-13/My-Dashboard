import React, { useState, useEffect } from "react";
// import React-router libraries to create a dashboard with multiple pages
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
// import icons from react-icons
import { FiSettings } from "react-icons/fi";
//This is a MUI (Material-UI) component that provides tooltip functionality.
import { Container, Tooltip, IconButton } from "@mui/material";
// import CSS file
import "./App.css";
// import components
import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
// import pages
import {
  Ecommerce,
  Orders,
  Calender,
  Employees,
  Stacked,
  Pyramid,
  Customers,
  Kanban,
  Line,
  Area,
  Bar,
  Pie,
  Financial,
  ColorPicker,
  ColorMapping,
  Editor,
} from "./pages";

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

              {/* adding Routes to my app */}
              <Routes>
                {/* creating the Routes  */}
                {/* Dashboard */}
                <Route path="/" element={<Ecommerce />} />
                <Route path="/ecommerce" element={<Ecommerce />} />
                {/* pages */}
                <Route path="/orders" element={<Orders />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/customers" element={<Customers />} />
                {/* apps */}
                <Route path="/kanban" element={<Kanban />} />
                <Route path="/editor" element={<Editor />} />
                <Route path="/calender" element={<Calender />} />
                <Route path="/color-picker" element={<ColorPicker />} />
                {/* charts */}
                <Route path="/line" element={<Line />} />
                <Route path="/area" element={<Area />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/financial" element={<Financial />} />
                <Route path="/color-mapping" element={<ColorMapping />} />
                <Route path="/pyramid" element={<Pyramid />} />
                <Route path="/stacked" element={<Stacked />} />
              </Routes>
            </div>
            {/* adding Footer Component */}
            <Footer />
          </Container>
        </div>
      </Router>
    </>
  );
}

export default App;
