import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { BsCurrencyDollar, BsShield } from "react-icons/bs";
import { FiCreditCard } from "react-icons/fi";
import { useStateContext } from "../context/ContextProvider";

const notifications = [
  {
    icon: <BsCurrencyDollar />,
    title: "Payment received",
    desc: "New order payment was added.",
    time: "2 min ago",
    iconBg: "#E5FAFB",
    iconColor: "#03C9D7",
  },
  {
    icon: <BsShield />,
    title: "Security check",
    desc: "Your account passed the latest scan.",
    time: "25 min ago",
    iconBg: "rgb(235, 250, 242)",
    iconColor: "rgb(0, 194, 146)",
  },
  {
    icon: <FiCreditCard />,
    title: "Card updated",
    desc: "Billing method has been refreshed.",
    time: "1 hour ago",
    iconBg: "rgb(255, 244, 229)",
    iconColor: "rgb(254, 201, 15)",
  },
];

const Notification = () => {
  const { currentColor, setActiveMenu } = useStateContext();

  return (
    <div className="absolute right-4 top-2 z-50 w-[min(360px,calc(100vw-2rem))] rounded-lg bg-white p-5 shadow-2xl dark:bg-secondary-dark-bg">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Notifications
          </p>
          <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-500">
            {notifications.length} new
          </span>
        </div>
        <button
          type="button"
          onClick={() => setActiveMenu("")}
          className="rounded-full p-2 text-gray-400 hover:bg-light-gray dark:hover:bg-gray-700"
          aria-label="Close notifications"
        >
          <MdOutlineCancel />
        </button>
      </div>

      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {notifications.map((item) => (
          <div key={item.title} className="flex gap-3 py-4">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-full text-xl"
              style={{ backgroundColor: item.iconBg, color: item.iconColor }}
            >
              {item.icon}
            </span>
            <div className="flex-1">
              <p className="font-semibold text-gray-800 dark:text-gray-100">
                {item.title}
              </p>
              <p className="text-sm text-gray-400">{item.desc}</p>
              <p className="mt-1 text-xs" style={{ color: currentColor }}>
                {item.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="mt-4 w-full rounded-lg px-4 py-3 text-sm font-semibold text-white hover:opacity-90"
        style={{ backgroundColor: currentColor }}
      >
        View all notifications
      </button>
    </div>
  );
};

export default Notification;
