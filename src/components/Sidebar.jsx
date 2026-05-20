import React from "react";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { links } from "../data/dummy"; // your existing links data
import { useStateContext } from "../context/ContextProvider";

const Sidebar = () => {
  const { currentColor, setIsActive } = useStateContext();

  // Active link style — uses currentColor from context
  const activeLink = `flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg
    text-white text-md m-2`;

  const normalLink = `flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg
    text-md text-gray-700 dark:text-gray-200 dark:hover:text-white
    hover:bg-light-gray m-2`;

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto
      md:hover:overflow-auto pb-10">

      {/* Logo / Brand */}
      <div className="flex justify-between items-center mt-4">
        <Link
          to="/"
          className="items-center gap-3 ml-3 mt-4 flex text-xl
            font-extrabold tracking-tight dark:text-white text-slate-900"
        >
          <span style={{ color: currentColor }}>●</span>
          <span>ShopDash</span>
        </Link>
        <button
          type="button"
          onClick={() => setIsActive(false)}
          className="text-xl rounded-full p-3 hover:bg-light-gray
            dark:hover:bg-[#2e3044] mt-4 block md:hidden"
          style={{ color: currentColor }}
        >
          <MdOutlineCancel />
        </button>
      </div>

      {/* Nav Links */}
      <div className="mt-10">
        {links.map((item) => (
          <div key={item.title}>
            <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase text-xs font-semibold tracking-widest">
              {item.title}
            </p>
            {item.links.map((link) => (
              <NavLink
                key={link.name}
                to={`/${link.name}`}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
                style={({ isActive }) =>
                  isActive ? { backgroundColor: currentColor } : {}
                }
              >
                <span className="text-lg">{link.icon}</span>
                <span className="capitalize">{link.name}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom accent line */}
      <div
        className="mx-4 mt-8 h-0.5 rounded-full opacity-30"
        style={{ backgroundColor: currentColor }}
      />
    </div>
  );
};

export default Sidebar;
