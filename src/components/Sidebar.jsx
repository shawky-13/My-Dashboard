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
  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      sidebar component
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
