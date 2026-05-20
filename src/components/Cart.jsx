import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { cartData } from "../data/dummy";
import { useStateContext } from "../context/ContextProvider";

const Cart = () => {
  const { currentColor, setActiveMenu } = useStateContext();
  const total = cartData.reduce(
    (sum, item) => sum + Number(item.price.replace(/[^0-9.]/g, "")),
    0
  );

  return (
    <Panel>
      <PanelHeader
        title="Shopping Cart"
        count={cartData.length}
        onClose={() => setActiveMenu("")}
      />

      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {cartData.map((item) => (
          <div key={item.name} className="flex gap-4 py-4">
            <img
              src={item.image}
              alt={item.name}
              className="h-20 w-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <p className="font-semibold text-gray-800 dark:text-gray-100 capitalize">
                {item.name}
              </p>
              <p className="text-sm text-gray-400">{item.category}</p>
              <p className="mt-2 font-semibold" style={{ color: currentColor }}>
                {item.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between text-gray-700 dark:text-gray-100">
        <span className="text-sm font-semibold">Subtotal</span>
        <span className="text-lg font-bold">${total.toLocaleString()}</span>
      </div>
      <button
        type="button"
        className="mt-4 w-full rounded-lg px-4 py-3 text-sm font-semibold text-white hover:opacity-90"
        style={{ backgroundColor: currentColor }}
      >
        Checkout
      </button>
    </Panel>
  );
};

const Panel = ({ children }) => (
  <div className="absolute right-4 top-2 z-50 w-[min(360px,calc(100vw-2rem))] rounded-lg bg-white p-5 shadow-2xl dark:bg-secondary-dark-bg">
    {children}
  </div>
);

const PanelHeader = ({ title, count, onClose }) => (
  <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-700">
    <div className="flex items-center gap-2">
      <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        {title}
      </p>
      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500 dark:bg-gray-700 dark:text-gray-300">
        {count}
      </span>
    </div>
    <button
      type="button"
      onClick={onClose}
      className="rounded-full p-2 text-gray-400 hover:bg-light-gray dark:hover:bg-gray-700"
      aria-label={`Close ${title}`}
    >
      <MdOutlineCancel />
    </button>
  </div>
);

export default Cart;
