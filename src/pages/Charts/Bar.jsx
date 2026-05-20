import React from "react";
import ReactApexChart from "react-apexcharts";
import { barCustomSeries } from "../../data/dummy";
import { useStateContext } from "../../context/ContextProvider";
import ChartPage from "./ChartPage";

const Bar = () => {
  const { currentMode, currentColor } = useStateContext();
  const isDark = currentMode === "Dark";

  const series = barCustomSeries.map((item) => ({
    name: item.name,
    data: item.dataSource.map((point) => point.y),
  }));

  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      background: "transparent",
    },
    colors: [currentColor, "#C0C0C0", "#CD7F32"],
    plotOptions: {
      bar: {
        borderRadius: 5,
        columnWidth: "48%",
      },
    },
    dataLabels: {
      enabled: true,
      style: { colors: ["#ffffff"] },
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
      categories: barCustomSeries[0].dataSource.map((point) => point.x),
      labels: { style: { colors: isDark ? "#cbd5e1" : "#64748b" } },
      axisBorder: { color: isDark ? "#3f4454" : "#e5e7eb" },
      axisTicks: { color: isDark ? "#3f4454" : "#e5e7eb" },
    },
    yaxis: {
      labels: { style: { colors: isDark ? "#cbd5e1" : "#64748b" } },
    },
    tooltip: { theme: isDark ? "dark" : "light" },
  };

  return (
    <ChartPage
      title="Bar Chart"
      description="Olympic medal comparison across countries."
    >
      <ReactApexChart options={options} series={series} type="bar" height={420} />
    </ChartPage>
  );
};

export default Bar;
