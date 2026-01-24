import React, { useEffect } from "react";
// import some icons of the Navbar
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
// import tooltip component from MUI
import { Tooltip } from "@mui/material";
// import user profile image
import avatar from "../data/avatar.jpg";
// import context provider to use context values from ContextProvider file
import { useStateContext } from "../context/ContextProvider";
// import some components that i will use in the Navbar
import { Cart, Chat, Notification, UserProfile } from ".";

const Navbar = () => {
  // using active menu from context provider
  const [activeMenu, setActiveMenu] = useStateContext();

  // create Button component to reuse it in the Navbar
  const NavButton = ({ title, icon }) => {
    return (
      <Tooltip title={title} placement="bottom">
        {/* // placeMent bottomCenter isn't valid */}
        <button type="button" className="text-4xl text-black">
          <span>{icon}</span>
        </button>
      </Tooltip>
    );
  };
  return (
    <div className=" flex justify-between items-center p-0.5 relative md:mx-6">
      <NavButton title={"Menu"} icon={<AiOutlineMenu />} />
    </div>
  );
};

export default Navbar;
