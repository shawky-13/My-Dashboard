import React from "react";
import ReactApexChart from "react-apexcharts";
import { financialChartData } from "../../data/dummy";
import { useStateContext } from "../../context/ContextProvider";
import ChartPage from "./ChartPage";

const Financial = () => {
  const { currentMode, currentColor } = useStateContext();
  const isDark = currentMode === "Dark";

  const options = {
    chart: {
      type: "candlestick",
      toolbar: { show: true },
      background: "transparent",
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: currentColor,
          downward: "#FF5C8E",
        },
        wick: { useFillColor: true },
      },
    },
    grid: {
      borderColor: isDark ? "#3f4454" : "#e5e7eb",
      strokeDashArray: 4,
    },
    xaxis: {
      type: "datetime",
      labels: { style: { colors: isDark ? "#cbd5e1" : "#64748b" } },
      axisBorder: { color: isDark ? "#3f4454" : "#e5e7eb" },
      axisTicks: { color: isDark ? "#3f4454" : "#e5e7eb" },
    },
    yaxis: {
      tooltip: { enabled: true },
      labels: {
        formatter: (value) => `$${value.toFixed(0)}`,
        style: { colors: isDark ? "#cbd5e1" : "#64748b" },
      },
    },
    tooltip: { theme: isDark ? "dark" : "light" },
  };

  const series = [
    {
      name: "Apple Stock",
      data: financialChartData.map((item) => ({
        x: item.x.getTime(),
        y: [item.open, item.high, item.low, item.close],
      })),
    },
  ];

  return (
    <ChartPage
      title="Financial Chart"
      description="Candlestick stock movement with open, high, low, and close prices."
    >
      <ReactApexChart
        options={options}
        series={series}
        type="candlestick"
        height={420}
      />
    </ChartPage>
  );
};

export default Financial;
