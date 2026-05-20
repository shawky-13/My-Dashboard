import React from "react";
import ReactApexChart from "react-apexcharts";
import { stackedChartData } from "../../data/dummy.jsx";
import { useStateContext } from "../../context/ContextProvider";

const Stacked = ({ width = "100%", height = 420 }) => {
  const { currentMode, currentColor } = useStateContext();
  const isDark = currentMode === "Dark";

  const options = {
    chart: {
      type: "bar",
      stacked: true,
      toolbar: { show: false },
      background: "transparent",
    },
    colors: [currentColor, "#FF5C8E"],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 4,
        columnWidth: "58%",
      },
    },
    dataLabels: { enabled: false },
    grid: {
      borderColor: isDark ? "#3f4454" : "#e5e7eb",
      strokeDashArray: 4,
    },
    legend: {
      position: "bottom",
      labels: { colors: isDark ? "#e5e7eb" : "#475569" },
    },
    xaxis: {
      categories: stackedChartData[0].map((item) => item.x),
      labels: { style: { colors: isDark ? "#cbd5e1" : "#64748b" } },
      axisBorder: { color: isDark ? "#3f4454" : "#e5e7eb" },
      axisTicks: { color: isDark ? "#3f4454" : "#e5e7eb" },
    },
    yaxis: {
      labels: { style: { colors: isDark ? "#cbd5e1" : "#64748b" } },
    },
    tooltip: {
      theme: isDark ? "dark" : "light",
      shared: true,
      intersect: false,
    },
  };

  const series = [
    {
      name: "Budget",
      data: stackedChartData[0].map((item) => item.y),
    },
    {
      name: "Expense",
      data: stackedChartData[1].map((item) => item.y),
    },
  ];

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="bar"
      width={width}
      height={height}
    />
  );
};

export default Stacked;
