import React from "react";
import ReactApexChart from "react-apexcharts";
import { PyramidData } from "../../data/dummy";
import { useStateContext } from "../../context/ContextProvider";
import ChartPage from "./ChartPage";

const Pyramid = () => {
  const { currentMode, currentColor } = useStateContext();
  const isDark = currentMode === "Dark";

  const sortedData = [...PyramidData].sort((a, b) => a.y - b.y);
  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      background: "transparent",
    },
    colors: [currentColor],
    plotOptions: {
      bar: {
        horizontal: true,
        isFunnel: true,
        borderRadius: 2,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (value, opts) => {
        const label = opts.w.globals.labels[opts.dataPointIndex];
        return `${label}: ${value} cal`;
      },
      style: { colors: ["#ffffff"] },
    },
    grid: { show: false },
    xaxis: {
      categories: sortedData.map((item) => item.x),
      labels: { style: { colors: isDark ? "#cbd5e1" : "#64748b" } },
    },
    yaxis: {
      labels: { style: { colors: isDark ? "#cbd5e1" : "#64748b" } },
    },
    tooltip: {
      theme: isDark ? "dark" : "light",
      y: { formatter: (value) => `${value} calories` },
    },
  };

  return (
    <ChartPage
      title="Pyramid Chart"
      description="Food category calories displayed as a funnel-style pyramid."
    >
      <ReactApexChart
        options={options}
        series={[{ name: "Calories", data: sortedData.map((item) => item.y) }]}
        type="bar"
        height={420}
      />
    </ChartPage>
  );
};

export default Pyramid;
