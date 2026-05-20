import React from "react";
import { LineChart } from "../../components";
import ChartPage from "./ChartPage";

const Line = () => {
  return (
    <ChartPage
      title="Line Chart"
      description="Yearly growth comparison across Germany, England, and India."
    >
      <LineChart />
    </ChartPage>
  );
};

export default Line;
