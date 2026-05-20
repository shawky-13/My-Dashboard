import React from "react";
import Header from "../../components/Header";

const ChartPage = ({ title, children, description }) => {
  return (
    <div className="m-2 md:m-10 p-4 md:p-10 rounded-lg bg-white dark:bg-secondary-dark-bg">
      <Header title={title} category="Chart" />
      {description && (
        <p className="mb-8 max-w-3xl text-sm leading-6 text-gray-500 dark:text-gray-300">
          {description}
        </p>
      )}
      <div className="min-h-[420px]">{children}</div>
    </div>
  );
};

export default ChartPage;
