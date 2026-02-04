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
  // using active menu & isClicked for navbar icons from context provider
  const {
    activeMenu,
    setActiveMenu,
    isClicked,
    setIsClicked,
    handleClick,
    screenSize,
    setScreenSize,
  } = useStateContext();
  //  useEffect to handle screen resizing for mobile responsive design
  useEffect(() => {
    // create handleResize function to set the screen size
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };
    // add event listener to window resize
    window.addEventListener("resize", handleResize);
    // call handleResize to set the initial screen size
    handleResize();
    // cleanup function to remove event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // useEffect to toggle activeMenu based on screen size
  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);
  // create Button component to reuse it in the Navbar
  const NavButton = ({ title, icon, dotColor, customFunc }) => {
    return (
      <Tooltip title={title} placement="bottom">
        {/* // placeMent bottomCenter isn't valid */}
        <button
          type="button"
          className="text-2xl relative rounded-full p-3 text-black cursor-pointer"
          onClick={customFunc}
        >
          <span
            className="absolute w-2 h-2 rounded-full top-2 right-2 p-1"
            style={{ backgroundColor: dotColor }}
          ></span>
          {icon}
        </button>
      </Tooltip>
    );
  };
  return (
    <div className=" flex justify-between items-center p-0.5 relative md:mx-6">
      <NavButton
        title={"Menu"}
        icon={<AiOutlineMenu />}
        customFunc={() => setActiveMenu((prev) => !prev)}
      />
      <div className=" flex justify-between items-center p-0.5 md:mx-10">
        <NavButton
          title={"Cart"}
          icon={<FiShoppingCart />}
          customFunc={() => handleClick("cart")}
        />
        <NavButton
          title={"Chat"}
          icon={<BsChatLeft />}
          customFunc={() => handleClick("chat")}
          dotColor={"#03C9D7"}
        />
        <NavButton
          title={"Notification"}
          icon={<RiNotification3Line />}
          customFunc={() => handleClick("notification")}
          dotColor={"#03C9D7"}
        />
        <Tooltip
          title={"Profile"}
          placement="bottom"
          onClick={() => handleClick("userProfile")}
        >
          <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg">
            <img
              src={avatar}
              alt="avatar"
              className={"w-10 h-10 rounded-full"}
            />
            <p>
              <span>Hi, </span>
              <span className="font-bold ml-1">Shawky</span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </Tooltip>
      </div>
      {/* adding the content when clicking on navbar icons */}
      {isClicked.cart && <Cart />}
      {isClicked.chat && <Chat />}
      {isClicked.notification && <Notification />}
      {isClicked.userProfile && <UserProfile />}
    </div>
  );
};

export default Navbar;
