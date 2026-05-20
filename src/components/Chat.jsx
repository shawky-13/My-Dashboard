import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { chatData } from "../data/dummy";
import { useStateContext } from "../context/ContextProvider";

const Chat = () => {
  const { currentColor, setActiveMenu } = useStateContext();

  return (
    <div className="absolute right-4 top-2 z-50 w-[min(360px,calc(100vw-2rem))] rounded-lg bg-white p-5 shadow-2xl dark:bg-secondary-dark-bg">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Messages
          </p>
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500 dark:bg-gray-700 dark:text-gray-300">
            {chatData.length}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setActiveMenu("")}
          className="rounded-full p-2 text-gray-400 hover:bg-light-gray dark:hover:bg-gray-700"
          aria-label="Close messages"
        >
          <MdOutlineCancel />
        </button>
      </div>

      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {chatData.map((item) => (
          <button
            type="button"
            key={`${item.message}-${item.time}`}
            className="flex w-full gap-3 py-4 text-left hover:bg-light-gray dark:hover:bg-gray-700"
          >
            <img
              src={item.image}
              alt=""
              className="h-11 w-11 rounded-full object-cover"
            />
            <span className="flex-1">
              <span className="block font-semibold text-gray-800 dark:text-gray-100">
                {item.message}
              </span>
              <span className="block text-sm text-gray-400">{item.desc}</span>
              <span className="mt-1 block text-xs" style={{ color: currentColor }}>
                {item.time}
              </span>
            </span>
          </button>
        ))}
      </div>

      <button
        type="button"
        className="mt-4 w-full rounded-lg px-4 py-3 text-sm font-semibold text-white hover:opacity-90"
        style={{ backgroundColor: currentColor }}
      >
        See all messages
      </button>
    </div>
  );
};

export default Chat;
