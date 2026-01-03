import React from "react";
// first start to import some components from react-router-dom
import { Link, NavLink } from "react-router-dom";
// import some icons from react icons
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
// import links from dummy data file
import { links } from "../data/dummy";
// import tooltip component from MUI
import { Tooltip } from "@mui/material";

const Sidebar = () => {
  let activeMenu = true;
  return (
    // the div under is the main div of the sidebar
    <div className="ml-3 p-4 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {/* // here i check if activeMenu is true to show the sidebar content */}
      {activeMenu && (
        <div className="flex justify-between items-center">
          {/* here i used Link component from react-router to transfer between the pages */}
          <Link to="/">
            <div className="flex items-center gap-3 justifiy-between text-2xl font-extrabold m-4 text-slate-900 dark:text-white">
              {/* i used SiShopware component from react-icons */}
              <SiShopware /> <span>Shoppy</span>
            </div>
          </Link>
          {/* here i used Tooltip component from MUI for tooltip functionality */}
          <Tooltip title="Menu" placement="top" className="cursor-pointer">
            <button type="button">
              {/* i used MdOutlineCancel component from react-icons */}
              <MdOutlineCancel className="text-2xl" />
            </button>
          </Tooltip>
        </div>
      )}
      {/* creating the links of the sidebar */}
      <div className="mt-10">
        {links.map((item) => {
          return (
            <div className="mb-3" key={item.title}>
              <p className="uppercase text-gray-400 mb-5">{item.title}</p>
              <div>
                {item.links.map((link) => {
                  return (
                    <NavLink
                      to={link.path}
                      key={link.name}
                      className="flex justify-start items-center rounded-lg p-2 m-2 duration-400 text-md text-gray-700 hover:bg-yellow-300 dark:hover:bg-slate-700 dark:text-gray-200"
                    >
                      <p className="mr-3">{link.icon}</p>
                      <p className=" capitalize">{link.name}</p>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;

/*
    Steps to create Sidebar component :
1. import React
2. import Link and NavLink from react-router-dom for navigation
3. import some icons from react-icons
4. import links data from dummy data file
5. import Tooltip component from MUI for tooltip functionality





*/

// note in this componet an error has been appear when i run the code
/*
    The error is :

Pre-transform error: Failed to resolve import "@mui/icons-material/MoveToInbox" from "src/components/Sidebar.jsx". Does the file exist?
  Plugin: vite:import-analysis
  File: D:/SoftWare Engineering/React_19/Dashboard/my-dashborad/src/components/Sidebar.jsx:11:22
  10 |  import ListItemIcon from "@mui/material/ListItemIcon";
  11 |  import ListItemText from "@mui/material/ListItemText";
  12 |  import InboxIcon from "@mui/icons-material/MoveToInbox";
     |                         ^
  13 |  import MailIcon from "@mui/icons-material/Mail";
  14 |  var _jsxFileName = "D:/SoftWare Engineering/React_19/Dashboard/my-dashborad/sr


    the problem is that i used a mui icon that is not installed in my project
    to solve this problem i need to install the package @mui/icons-material
    by running the following command in my terminal :
    npm install @mui/icons-material
*/
