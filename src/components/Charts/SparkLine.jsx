import React from "react";
import ReactApexChart from "react-apexcharts";
// the import above is for the chart library that we will use to create the sparkline chart

const SparkLine = ({ currentColor, id, type, height, width, data }) => {
  // currentColor: this is the color that we will use to fill the chart
  // id: this is the id that we will use to identify the chart
  // type: this is the type of the chart that we will create (line, area, bar)
  // height: this is the height of the chart
  // width: this is the width of the chart
  // data: this is the data that we will use to create the chart

  // this is the options object that we will pass to the ReactApexChart component to customize the chart
  //  Everything about how the chart looks and behaves goes here.
  const options = {
    // Tells ApexCharts what kind of chart to draw.
    // The value comes from the type prop passed by the parent — so if you pass type="area" it draws an area chart.
    chart: {
      type: type,
      sparkline: {
        enabled: true,
      },
      // sparkline: true, // This is the key setting that makes the chart a sparkline. When enabled, it hides axes, grid lines, and padding to create a compact inline chart.
      // This is the most important setting. When enabled: true, ApexCharts enters sparkline mode which automatically:
      // Hides the X and Y axes
      // Removes grid lines
      // Removes padding around the chart
      // Makes it look like a small inline chart — exactly like Syncfusion's SparklineComponent

    },

    tooltip: {
      enabled: true,
    },
    // Shows a small popup when the user hovers over the chart showing the value at that point. This replaces the SparklineTooltip you were injecting in Syncfusion.

    stroke: {
      curve: "smooth",
      width: 2,
    },
    // stroke: Controls the line style.
    //  curve: "smooth" makes the line flow with soft curves instead of sharp angles.
    //  width: 2 sets the line thickness to 2 pixels — thin enough for a sparkline

    fill: {
      opacity: 1,
    },
    // fill: Controls the filled area under the line.
    //  opacity: 1 means fully visible. If you set it to 0.3 it becomes semi-transparent — useful for area charts so the fill doesn't look too heavy.


    colors: [currentColor],
    // colors: This sets the color of the line (and fill for area charts).
    // Sets the color of the chart line and fill.
    // It's wrapped in an array [] because ApexCharts supports multiple series with different colors, 
    // so it expects a list. The actual color value comes from the currentColor prop.

    // By passing currentColor from the parent, you can dynamically change the chart's color to match your app's theme or design.
  };

  const series = [
    {
      name: "Value",
      data: data,
    },
  ];

  // This is the actual data ApexCharts will draw. It's an array because ApexCharts supports multiple lines (series) on one chart. Each series needs:
  // name — label shown in the tooltip
  // data — the array of numbers to plot, which comes from the data prop


  // Guard: don't render if data is empty or missing
  if (!data || data.length === 0) return null;
  // A safety guard. This checks two things:

  // !data — if no data was passed at all
  // data.length === 0 — if an empty array was passed
  // If either is true, the component returns null meaning it renders nothing instead of crashing. Always good practice to protect against missing data.


  return (
    <ReactApexChart
      options={options}
      series={series}
      type={type}
      height={height}
      width={width}
      id={id}
    />
  );
};

export default SparkLine;