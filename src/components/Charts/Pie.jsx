import React from "react";
import ReactApexChart from "react-apexcharts";
import { pieChartData } from "../../data/dummy";
import { useStateContext } from "../../context/ContextProvider";

const Pie = ({ height = 420 }) => {
  const { currentMode, currentColor } = useStateContext();
  const isDark = currentMode === "Dark";

  const options = {
    chart: {
      type: "donut",
      background: "transparent",
    },
    colors: [
      currentColor,
      "#00C292",
      "#FF5C8E",
      "#FB9678",
      "#7352FF",
      "#FEC90F",
      "#1E4DB7",
    ],
    labels: pieChartData.map((item) => item.x),
    legend: {
      position: "bottom",
      labels: { colors: isDark ? "#e5e7eb" : "#475569" },
    },
    stroke: {
      colors: [isDark ? "#33373E" : "#ffffff"],
      width: 3,
    },
    dataLabels: {
      enabled: true,
      formatter: (value) => `${value.toFixed(0)}%`,
    },
    tooltip: {
      theme: isDark ? "dark" : "light",
      y: { formatter: (value) => `${value}%` },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "62%",
          labels: {
            show: true,
            name: { color: isDark ? "#e5e7eb" : "#475569" },
            value: {
              color: isDark ? "#f8fafc" : "#1e293b",
              formatter: (value) => `${value}%`,
            },
            total: {
              show: true,
              label: "Costs",
              color: isDark ? "#e5e7eb" : "#475569",
            },
          },
        },
      },
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={pieChartData.map((item) => item.y)}
      type="donut"
      height={height}
    />
  );
};

export default Pie;
