import React from "react";
import ReactApexChart from "react-apexcharts";
// apexcharts is a library for creating charts in React applications.
//  It provides a simple and flexible way to create various types of charts,
//  including bar charts, line charts, pie charts, and more.
import { stackedChartData } from "../../data/dummy.jsx";

const Stacked = ({ width, height }) => {

  // Starts the configuration object. 
  // Everything inside here controls how the chart looks and behaves.
  //  This replaces all the Syncfusion service injections like Legend, Tooltip, Category 
  // — they're all just properties inside this object now.
  const options = {
    // The 'chart' property defines the type of chart and some global settings.
    chart: {
      type: "bar",
      stacked: true,
      // This is what makes it a stacking chart — bars pile on top of each other instead of sitting side by side.
      //  This replaces the StackingColumnSeries you had in Syncfusion.

      toolbar: { show: false },
      // Hides the toolbar that ApexCharts shows by default in the top-right corner of the chart (download, zoom, pan buttons). 
      // Setting it to false gives a cleaner look for a dashboard.
    },

    // The 'xaxis' and 'yaxis' properties configure the axes of the chart.
    xaxis: {

      categories: stackedChartData[0].map(d => d.x),
      // Sets the labels on the X axis (bottom of the chart).
      //  stackedChartData[0] gets the first array (Budget), then .map(d => d.x) loops through every object and pulls out just the x value, giving you:
      // ["Jan", "Feb", "Mar", "Apr", "May"]

      type: "category",
      // Tells ApexCharts the X axis contains text categories (month names), not numbers or dates.
      //  The three options are "category", "numeric", and "datetime".

      // The 'labels' property inside both xaxis and yaxis configures the appearance of the axis labels
      //  (the text that shows the categories on the X axis and the numbers on the Y axis).
      labels: {
        style: { colors: "gray", fontSize: "12px" },
        // Styles the X axis labels — sets them to gray color and 12px font size so they don't compete visually with the chart data.
      },
    },


    yaxis: {
      labels: {
        style: { colors: "gray", fontSize: "12px" },
      },
      // Same styling but for the Y axis labels (the numbers on the left side of the chart).
      //  Keeps both axes visually consistent.
    },

    // The 'legend' property configures the legend that explains what each color in the chart represents (Budget vs Expense).
    legend: {
      show: true,
      position: "bottom",
      // Shows the legend (the colored labels that tell you which color = Budget and which = Expense)
      //  and places it at the bottom of the chart. This replaces the Legend service from Syncfusion.
      //  Other position options are "top", "left", "right".

    },

    // The 'tooltip' property configures the tooltip that appears when you hover over a bar in the chart.
    tooltip: {
      enabled: true,
      shared: true,
      intersect: false,

      // Controls the hover tooltip. Three settings here:
      // SettingPurpose
      // enabled: true => Turns the tooltip on — replaces Tooltip from Syncfusion
      // shared: true => Shows both Budget AND Expense values in one tooltip when hovering
      // intersect: false => MUST be false when shared: true — this was the error you had.
      // If intersect is true, the tooltip only shows when hovering directly on a bar, which conflicts with shared
    },


    colors: ["#1A97F5", "#FF5C8E"],

    //plotOptions is where you configure the specific type of chart you're using — in this case, a bar chart.
    plotOptions: {
      bar: {
        horizontal: false,
        // horizontal: false means the bars go vertically (upward) which makes them columns. If you set this to true the bars would go sideways.

        borderRadius: 3,
        // Adds slightly rounded corners to the top of each bar — just a small visual detail that makes the chart look more modern.

        columnWidth: "65%",
        //Controls how wide each bar column is relative to the available space.
        //  "55%" means the bar takes up 55% of its slot, leaving 45% as gap. Lower = thinner bars with more space between them, higher = thicker bars.
      },
    },


    // The 'dataLabels' property configures the labels that show the exact value on top of each bar.
    dataLabels: {
      enabled: false,
      // Hides the number labels that would appear on top of each bar segment. Keeping them hidden makes the chart cleaner, especially when values are close together.
    },

    // The 'fill' property configures how the bars are filled with color.
    fill: {
      opacity: 1,
      //Sets the fill opacity of the bars to fully solid (1 = 100% visible). If you set it to 0.5 the bars would be semi-transparent.

    },

    // The 'grid' property configures the grid lines that appear behind the bars to help read values.
    grid: {
      borderColor: "#e0e0e0",
      //Sets the color of the horizontal grid lines behind the chart to a light gray. This gives subtle visual guides without being distracting.

    },

  };

  // The 'series' variable is where you provide the actual data for the chart.
  //  It must be an array of objects, where each object represents a series (Budget and Expense in this case).
  //Starts the data array.
  const series = [
    //  This is what ApexCharts actually draws.
    //  It replaces both SeriesCollectionDirective and SeriesDirective from Syncfusion — instead of XML-like components,
    //  it's just a plain JavaScript array.

    // The first series — the Budget bars. Two properties:
    {
      name: "Budget",
      // name: "Budget" — the label shown in the legend and tooltip

      data: stackedChartData[0].map(d => d.y),
      // data: stackedChartData[0].map(d => d.y) — grabs index[0](the Budget array) and pulls out only the y numbers, giving: [111.1, 127.3, 143.4, 159.9, 159.9, 159.9, 159.9]

    },


    {
      name: "Expense",
      data: stackedChartData[1].map(d => d.y),
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