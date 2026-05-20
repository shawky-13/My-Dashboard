import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import avatar from "../data/avatar.jpg";
import { userProfileData } from "../data/dummy";
import { useStateContext } from "../context/ContextProvider";

const UserProfile = () => {
  const { currentColor, setActiveMenu } = useStateContext();

  return (
    <div className="absolute right-4 top-2 z-50 w-[min(360px,calc(100vw-2rem))] rounded-lg bg-white p-5 shadow-2xl dark:bg-secondary-dark-bg">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-700">
        <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          User Profile
        </p>
        <button
          type="button"
          onClick={() => setActiveMenu("")}
          className="rounded-full p-2 text-gray-400 hover:bg-light-gray dark:hover:bg-gray-700"
          aria-label="Close user profile"
        >
          <MdOutlineCancel />
        </button>
      </div>

      <div className="flex gap-4 py-5">
        <img src={avatar} alt="User" className="h-20 w-20 rounded-full object-cover" />
        <div>
          <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Michael Roberts
          </p>
          <p className="text-sm text-gray-400">Administrator</p>
          <p className="mt-1 text-sm" style={{ color: currentColor }}>
            michael@example.com
          </p>
        </div>
      </div>

      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {userProfileData.map((item) => (
          <button
            type="button"
            key={item.title}
            className="flex w-full items-center gap-4 py-4 text-left hover:bg-light-gray dark:hover:bg-gray-700"
          >
            <span
              className="flex h-11 w-11 items-center justify-center rounded-full text-xl"
              style={{ backgroundColor: item.iconBg, color: item.iconColor }}
            >
              {item.icon}
            </span>
            <span>
              <span className="block font-semibold text-gray-800 dark:text-gray-100">
                {item.title}
              </span>
              <span className="block text-sm text-gray-400">{item.desc}</span>
            </span>
          </button>
        ))}
      </div>

      <button
        type="button"
        className="mt-4 w-full rounded-lg px-4 py-3 text-sm font-semibold text-white hover:opacity-90"
        style={{ backgroundColor: currentColor }}
      >
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
