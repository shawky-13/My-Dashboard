import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Tooltip } from "@mui/material";
import avatar from "../data/avatar.jpg"; // adjust path if needed
import { useStateContext } from "../context/ContextProvider";

// Reusable NavButton with theme color on hover
const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <Tooltip title={title} placement="bottom" arrow>
    <button
      type="button"
      onClick={customFunc}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray dark:hover:bg-[#2e3044] transition-colors"
    >
      {dotColor && (
        <span
          className="absolute top-2 right-2 w-2 h-2 rounded-full"
          style={{ backgroundColor: dotColor }}
        />
      )}
      {icon}
    </button>
  </Tooltip>
);

const Navbar = () => {
  const {
    setIsActive,
    currentColor,
    handleClick,
  } = useStateContext();

  return (
    <div
      className="flex justify-between items-center p-2 md:mx-6 relative"
      style={{
        // Navbar bottom border picks up the current color
        borderBottom: `2px solid ${currentColor}22`,
      }}
    >
      {/* Left: Menu toggle */}
      <NavButton
        title="Menu"
        customFunc={() => setIsActive((prev) => !prev)}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />

      {/* Right: action icons + profile */}
      <div className="flex items-center gap-2">
        <NavButton
          title="Cart"
          customFunc={() => handleClick("cart")}
          color={currentColor}
          icon={<FiShoppingCart />}
          dotColor={currentColor}
        />
        <NavButton
          title="Chat"
          customFunc={() => handleClick("chat")}
          color={currentColor}
          icon={<BsChatLeft />}
          dotColor={currentColor}
        />
        <NavButton
          title="Notifications"
          customFunc={() => handleClick("notification")}
          color={currentColor}
          icon={<RiNotification3Line />}
          dotColor="red"
        />

        {/* Profile */}
        <Tooltip title="Profile" placement="bottom" arrow>
          <div
            onClick={() => handleClick("userProfile")}
            className="flex items-center gap-2 cursor-pointer p-1 rounded-lg
              hover:bg-light-gray dark:hover:bg-[#2e3044] transition-colors"
          >
            <img src={avatar} className="rounded-full w-8 h-8" alt="user" />
            <div>
              <span className="text-gray-400 text-xs">Hi,</span>
              <span
                className="font-bold ml-1 text-sm"
                style={{ color: currentColor }}
              >
                User
              </span>
            </div>
            <MdKeyboardArrowDown className="text-gray-400 text-sm" />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default Navbar;
