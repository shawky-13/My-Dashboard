import React from "react";
import { Pie as PieChart } from "../../components";
import ChartPage from "./ChartPage";

const Pie = () => {
  return (
    <ChartPage
      title="Pie Chart"
      description="Cost distribution by business category."
    >
      <PieChart />
    </ChartPage>
  );
};

export default Pie;
