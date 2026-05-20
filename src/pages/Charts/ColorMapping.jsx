import React from "react";
import ReactApexChart from "react-apexcharts";
import { colorMappingData, rangeColorMapping } from "../../data/dummy";
import { useStateContext } from "../../context/ContextProvider";
import ChartPage from "./ChartPage";

const ColorMapping = () => {
  const { currentMode } = useStateContext();
  const isDark = currentMode === "Dark";
  const temperatureData = colorMappingData[0];

  const getRangeColor = (value) => {
    const range = rangeColorMapping.find(
      (item) => value >= Number(item.start) && value <= Number(item.end)
    );
    return range?.colors?.[0] || "#FF4040";
  };

  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      background: "transparent",
    },
    plotOptions: {
      bar: {
        distributed: true,
        borderRadius: 5,
        columnWidth: "55%",
      },
    },
    colors: temperatureData.map((item) => getRangeColor(item.y)),
    dataLabels: {
      enabled: true,
      formatter: (value) => `${value}°C`,
      style: { colors: ["#1e293b"] },
    },
    grid: {
      borderColor: isDark ? "#3f4454" : "#e5e7eb",
      strokeDashArray: 4,
    },
    legend: { show: false },
    xaxis: {
      categories: temperatureData.map((item) => item.x),
      labels: { style: { colors: isDark ? "#cbd5e1" : "#64748b" } },
      axisBorder: { color: isDark ? "#3f4454" : "#e5e7eb" },
      axisTicks: { color: isDark ? "#3f4454" : "#e5e7eb" },
    },
    yaxis: {
      labels: {
        formatter: (value) => `${value}°C`,
        style: { colors: isDark ? "#cbd5e1" : "#64748b" },
      },
    },
    tooltip: {
      theme: isDark ? "dark" : "light",
      y: { formatter: (value) => `${value}°C` },
    },
  };

  return (
    <ChartPage
      title="Color Mapping"
      description="Monthly temperature values colored by their configured ranges."
    >
      <ReactApexChart
        options={options}
        series={[{ name: "Temperature", data: temperatureData.map((item) => item.y) }]}
        type="bar"
        height={420}
      />
      <div className="mt-6 flex flex-wrap gap-3">
        {rangeColorMapping.map((item) => (
          <span
            key={item.label}
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300"
          >
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: item.colors[0] }}
            />
            {item.label}
          </span>
        ))}
      </div>
    </ChartPage>
  );
};

export default ColorMapping;
