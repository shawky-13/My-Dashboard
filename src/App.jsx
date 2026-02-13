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

// import context provider to use context values from ContextProvider file
import { useStateContext } from "./context/ContextProvider";

function App() {
  const { isActive, setIsActive } = useStateContext();
  // let activeMenu = true;
  return (
    <>
      <Router>
        <div className="App">
          {/* main div off the app */}
          <div className="flex relative dark:bg-main-dark-bg">
            {/* div under is for setting tooltip component  */}
            <div className="fixed bottom-5 right-5">
              <Tooltip title="Settings" placement="top">
                <IconButton style={{ zIndex: "1000" }}>
                  <FiSettings className="text-6xl rounded-full duration-300 text-white p-3 bg-main-bg hover:text-light-gray hover:shadow" />
                </IconButton>
              </Tooltip>
            </div>
            {/* Start Sidebar */}
            {/*
              here is a note that when activeMenu equal to true sidebar component
              will be shown with width 240px else it will be hidden
               */}
            {isActive ? (
              <div className="w-72 fixed top-0 left-0 sidebar dark:bg-secondary-dark-bg bg-white ">
                <Sidebar />
              </div>
            ) : (
              <div className="w-0 hidden dark:bg-secondary-dark-bg">
                <Sidebar />
              </div>
            )}
            {/* End Sidebar */}
            {/* Start Main Content */}
            <div
              className={` ${isActive ? "ml-72" : "flex-2"} dark:bg-main-dark-bg bg-main-bg min-h-screen w-full md:static absolute left-0 top-0 `}
            >
              <div>
                {/* Start Navbar component */}
                <Navbar />
                {/* End Navbar component */}
              </div>
              {/*
              {/* adding Routes to my app */}
              <div>
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
            </div>
          </div>
          {/* End Main Content */}
        </div>
      </Router>
    </>
  );
}

export default App;
