import React from "react";
import ReactApexChart from "react-apexcharts";
import { areaCustomSeries } from "../../data/dummy";
import { useStateContext } from "../../context/ContextProvider";
import ChartPage from "./ChartPage";

const Area = () => {
  const { currentMode, currentColor } = useStateContext();
  const isDark = currentMode === "Dark";

  const series = areaCustomSeries.map((item) => ({
    name: item.name,
    data: item.dataSource.map((point) => ({
      x: point.x.getTime(),
      y: point.y,
    })),
  }));

  const options = {
    chart: {
      type: "area",
      toolbar: { show: false },
      background: "transparent",
    },
    colors: [currentColor, "#FF5C8E", "#00C292"],
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 3 },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.08,
      },
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
      labels: { style: { colors: isDark ? "#cbd5e1" : "#64748b" } },
      axisBorder: { color: isDark ? "#3f4454" : "#e5e7eb" },
      axisTicks: { color: isDark ? "#3f4454" : "#e5e7eb" },
    },
    yaxis: {
      labels: {
        formatter: (value) => `${value.toFixed(1)}%`,
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
    <ChartPage
      title="Area Chart"
      description="Percentage trend by country over time."
    >
      <ReactApexChart options={options} series={series} type="area" height={420} />
    </ChartPage>
  );
};

export default Area;
