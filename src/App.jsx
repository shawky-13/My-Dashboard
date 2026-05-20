import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { Tooltip, IconButton } from "@mui/material";
import "./App.css";

import {
  Navbar,
  Footer,
  Sidebar,
  ThemeSettings,
  Cart,
  Chat,
  Notification,
  UserProfile,
} from "./components";
import {
  Ecommerce, Orders, Calender, Employees,
  Stacked, Pyramid, Customers, Kanban,
  Line, Area, Bar, Pie, Financial,
  ColorPicker, ColorMapping, Editor,
} from "./pages";

import { useStateContext } from "./context/ContextProvider";

function App() {
  const { isActive, currentColor, setThemeSettings, activeMenu } =
    useStateContext();

  return (
    <Router>
      <div className="App">
        <div className="flex relative dark:bg-main-dark-bg">

          {/* Settings FAB — color matches current theme */}
          <div className="fixed bottom-5 right-5 z-50">
            <Tooltip title="Theme Settings" placement="top">
              <IconButton
                onClick={() => setThemeSettings(true)}
                style={{
                  backgroundColor: currentColor,
                  boxShadow: `0 4px 20px ${currentColor}66`,
                }}
                className="hover:opacity-90 transition-opacity"
              >
                <FiSettings className="text-2xl text-white" />
              </IconButton>
            </Tooltip>
          </div>

          {/* Sidebar */}
          {isActive ? (
            <div className="w-72 fixed top-0 left-0 sidebar dark:bg-secondary-dark-bg bg-white">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 hidden dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}

          {/* Main Content */}
          <div
            className={`${isActive ? "md:ml-72" : "flex-2"}
              dark:bg-main-dark-bg bg-main-bg min-h-screen w-full
              md:static absolute left-0 top-0`}
          >
            <Navbar />

            <div className="relative">
              {activeMenu === "cart" && <Cart />}
              {activeMenu === "chat" && <Chat />}
              {activeMenu === "notification" && <Notification />}
              {activeMenu === "userProfile" && <UserProfile />}
            </div>

            {/* ThemeSettings panel — rendered globally here */}
            <ThemeSettings />

            <Routes>
              <Route path="/"            element={<Ecommerce />} />
              <Route path="/ecommerce"   element={<Ecommerce />} />
              <Route path="/orders"      element={<Orders />} />
              <Route path="/employees"   element={<Employees />} />
              <Route path="/customers"   element={<Customers />} />
              <Route path="/calendar"    element={<Calender />} />
              <Route path="/kanban"      element={<Kanban />} />
              <Route path="/editor"      element={<Editor />} />
              <Route path="/color-picker" element={<ColorPicker />} />
              <Route path="/line"        element={<Line />} />
              <Route path="/area"        element={<Area />} />
              <Route path="/bar"         element={<Bar />} />
              <Route path="/pie"         element={<Pie />} />
              <Route path="/financial"   element={<Financial />} />
              <Route path="/color-mapping" element={<ColorMapping />} />
              <Route path="/pyramid"     element={<Pyramid />} />
              <Route path="/stacked"     element={<Stacked />} />
            </Routes>

            <Footer />
          </div>

        </div>
      </div>
    </Router>
  );
}

export default App;
