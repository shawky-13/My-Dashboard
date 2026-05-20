import React from "react";
import { Stacked as StackedChart } from "../../components";
import ChartPage from "./ChartPage";

const Stacked = () => {
  return (
    <ChartPage
      title="Stacked Chart"
      description="Budget and expense totals stacked by month."
    >
      <StackedChart width="100%" height={420} />
    </ChartPage>
  );
};

export default Stacked;
