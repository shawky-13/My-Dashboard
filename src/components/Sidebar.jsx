import React from "react";

const Sidebar = () => {
  return <div>

  </div>;
};

export default Sidebar;

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
