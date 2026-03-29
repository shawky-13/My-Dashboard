import React from "react";
import { BsCurrencyDollar } from "react-icons/bs"; // import icons from react-icons
import { RxDotFilled } from "react-icons/rx";
import { Stacked, Pie, Button, SparkLine } from "../components"; // import components
import {
  earningData,
  SparklineAreaData,
  ecomPieChartData,
} from "../data/dummy"; // import dummy data
// import Context Provider
import { useStateContext } from "../context/ContextProvider";
import welcomeImg from "../data/welcome-bg.svg"; // import welcome image

const Ecommerce = () => {
  // in the component i create div with className mt-12 to give margin top 12 that will push the content down from the top
  return (
    // let's create the first parent div in my component
    <div className="mt-12">
      {/*  */}
      <div className="bg-gray-50 flex flex-wrap lg:flex-nowrap justify-between items-center">
        {/* the next div is for layout of the section */}
        <div
          style={{ backgroundImage: `url(${welcomeImg})` }}
          className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          {/* completing the layout  */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400 font-bold">Earnings</p>
              <p className="text-2xl">43454,23</p>
            </div>
          </div>
          {/* adding button component  */}
          <div className="mt-6">
            <Button color={"white"} text={"Download"} bgColor={"blue"} borderRadius={"10px"} size={"md"} />
          </div>
        </div>

        {/* the next div is for the section cards  */}
        <div className="flex flex-wrap justify-center items-center gap-1 mt-10">
          {earningData.map((item) => (
            <div
              key={item.title}
              className="bg-white dark:bg-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl"
            >
              <button
                type="button"
                style={{ color: item.iconColor, background: item.iconBg, cursor: "pointer" }}
                className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="font-semibold text-xl">
                  {item.amount}
                </span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
              </p>
              <p className="text-sm text-gray-400 mt-1">
                {item.title}
              </p>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Ecommerce;
