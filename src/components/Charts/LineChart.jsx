import React from "react";
import ReactApexChart from "react-apexcharts";
import { lineCustomSeries } from "../../data/dummy";
import { useStateContext } from "../../context/ContextProvider";

const LineChart = ({ height = 420 }) => {
  const { currentMode, currentColor } = useStateContext();
  const isDark = currentMode === "Dark";

  const series = lineCustomSeries.map((item) => ({
    name: item.name,
    data: item.dataSource.map((point) => ({
      x: point.x.getTime(),
      y: point.y,
    })),
  }));

  const options = {
    chart: {
      type: "line",
      toolbar: { show: false },
      zoom: { enabled: false },
      background: "transparent",
    },
    colors: [currentColor, "#FF5C8E", "#00C292"],
    dataLabels: { enabled: false },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    markers: {
      size: 5,
      strokeWidth: 2,
      hover: { size: 7 },
    },
    grid: {
      borderColor: isDark ? "#3f4454" : "#e5e7eb",
      strokeDashArray: 4,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      labels: { colors: isDark ? "#e5e7eb" : "#475569" },
    },
    xaxis: {
      type: "datetime",
      labels: {
        style: { colors: isDark ? "#cbd5e1" : "#64748b" },
        datetimeFormatter: { year: "yyyy" },
      },
      axisBorder: { color: isDark ? "#3f4454" : "#e5e7eb" },
      axisTicks: { color: isDark ? "#3f4454" : "#e5e7eb" },
    },
    yaxis: {
      min: 0,
      max: 100,
      labels: {
        formatter: (value) => `${Math.round(value)}%`,
        style: { colors: isDark ? "#cbd5e1" : "#64748b" },
      },
    },
    tooltip: {
      theme: isDark ? "dark" : "light",
      x: { format: "yyyy" },
      y: { formatter: (value) => `${value}%` },
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      height={height}
    />
  );
};

export default LineChart;
