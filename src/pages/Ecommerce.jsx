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
    <div className="mt-12 bg-gray-50 dark:bg-gray-800 rounded-2xl p-4">
      {/* creating home section   */}
      <div className="flex flex-wrap lg:flex-nowrap justify-between items-center">
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
      {/* creating Revenue section */}
      <div className="flex flex-wrap gap-10 justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-200">
          {/* creating the top section of revenue section */}
          <div className="flex justify-between items-center">
            <p className="font-semibold capitalize">
              revenue updates
            </p>
            <div className="flex justify-between items-center gap-5 ">
              <p className="flex justify-between items-center">
                <span>
                  <RxDotFilled className="text-gray-400 text-2xl" />
                </span>
                <span className="text-gray-400 ml-2">
                  Expense
                </span>
              </p>
              <p className="flex justify-between items-center">
                <span>
                  <RxDotFilled className="text-green-400 text-2xl" />
                </span>
                <span className="text-green-400 ml-2">
                  Budget
                </span>
              </p>
            </div>
          </div>
          {/* creating the left section of revenue section */}
          <div className="mt-10 flex gap-10 justify-between items-center flex-wrap">
            <div className="m-3 pr-10 border-r-2 border-r-gray-400 ">
              <div className="">
                <p className="flex items-center">
                  <span className="flex flex-col justify-center items-start">
                    <span className="flex ">
                      <span>
                        <BsCurrencyDollar className=" text-3xl" />
                      </span>
                      <span className="text-2xl font-semibold">
                        93,438
                      </span>
                    </span>
                    <span>
                      <span className="font-semibold text-gray-400 capitalize text-xl ml-3">
                        badget
                      </span>
                    </span>
                  </span>
                  <span className="text-sm bg-green-400 text-white w-10 h-7 flex justify-center items-center rounded-2xl ml-2">
                    23%
                  </span>
                </p>
                <p className="flex items-center mt-8">
                  <span className="flex flex-col justify-center items-start">
                    <span className="flex ">
                      <span>
                        <BsCurrencyDollar className=" text-3xl" />
                      </span>
                      <span className="text-2xl font-semibold">
                        48,487
                      </span>
                    </span>
                    <span>
                      <span className="font-semibold text-gray-400 capitalize text-xl ml-3">
                        Expense
                      </span>
                    </span>
                  </span>

                </p>
              </div>
              {/* creating the line chart of this section  */}
              <div className="mt-5">
                <SparkLine
                  currentColor="#03C9D7"
                  id="sparkline-1"
                  type="area"
                  height={80}
                  width="200"
                  data={SparklineAreaData.map(d => d.yval)}
                />
                {/* 
                data={SparklineAreaData.map(d => d.yval)}
                  This is the most important prop — it passes the actual numbers to draw. Let's break it down further:
                  SparklineAreaData is the array from your dummy.jsx that looks like this:
                    js[
                        { x: 1, yval: 2 },
                        { x: 2, yval: 6 },
                        { x: 3, yval: 8 },
                        { x: 4, yval: 5 },
                        { x: 5, yval: 10 },
                      ]
                      .map(d => d.yval) loops through every object in the array and pulls out only the yval number, giving ApexCharts what it actually needs — a flat array of numbers:
                      js[2, 6, 8, 5, 10]
                      Without the .map() you'd be passing the full objects { x, yval } and ApexCharts wouldn't know what to draw.
                 */}
              </div>
              {/* creating the button that downloads the chart */}
              <div className="mt-5">
                <Button color={"white"} text={"Download Report"} bgColor={"#03C9D7"} borderRadius={"10px"} size={"md"} mt={10} />
              </div>
            </div>

            {/* creating the right section of revenue section stacked  */}
            <div>
              <Stacked width="320px" height="360px" />
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default Ecommerce;
