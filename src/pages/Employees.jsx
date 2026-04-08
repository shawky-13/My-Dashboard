import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
// Imports the AgGridReact component, which is the React wrapper for the powerful AG Grid data grid library.

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
// Two CSS files — ag-grid.css is the base structural styles (layout, borders, spacing).
//  ag-theme-quartz.css is the visual theme (colors, fonts, shadows).

import {
  ModuleRegistry,  // The system that registers all modules
  ClientSideRowModelModule, // Basic grid rendering — always required
  PaginationModule, // Pagination bar at the bottom
  TextFilterModule,  // Filter on text columns like Item, Customer
  NumberFilterModule, // Filter on number columns like Amount
} from "ag-grid-community";
// Imports AG Grid’s ModuleRegistry and specific modules:


ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  PaginationModule,
  TextFilterModule,
  NumberFilterModule,
]);
// Activates all the imported modules.
//  Without this step the grid would render empty even if the imports are correct. 
// Think of it like turning on switches before using them.


import { employeesData } from "../data/dummy";
import Header from "../components/Header";



const Employees = () => {

  const [rowData] = useState(employeesData);
  // Stores ordersData in React state. The [rowData] without a setter means the data never changes — it's read-only.
  //  If you wanted to update rows later you'd write const [rowData, setRowData] = useState(ordersData).


  const columnDefs = [
    // An array where each object defines one column of the grid.
    //  This replaces ColumnsDirective + ColumnDirective from Syncfusion.

    {
      headerName: "Employee Image",
      // headerName: column title.
      field: "EmployeeImage",
      // field: which property from rowData to display.
      minWidth: 150,
      // minWidth and flex: control responsive sizing.
      flex: 1,
      cellRenderer: (params) => (
        <div className="flex items-center justify-center h-full">
          <img
            src={params.value}
            alt="employee"
            style={{
              height: "46px",
              width: "46px",
              objectFit: "cover",  //  objectFit: "cover" => makes the image fill the box without stretching.
              borderRadius: "50%",
            }}
          />
        </div>
      ),
      // cellRenderer: custom rendering logic. Here, it shows a product image inside a styled div.
    },

    {
      headerName: "Employee Name",
      field: "Name",
      minWidth: 120,
      flex: 2,
    },


    {
      headerName: "Designation",
      field: "Title",
      minWidth: 130,
      flex: 2,
    },

    {
      headerName: "Country",
      field: "Country",
      minWidth: 100,
      flex: 1,
    },

    {
      headerName: "Hire Date",
      field: "HireDate",
      minWidth: 110,
      flex: 1,
    },

    {
      headerName: "Reports To",
      field: "ReportsTo",
      minWidth: 100,
      flex: 1,
    },

    {
      headerName: "Employee ID",
      field: "EmployeeID",
      minWidth: 130,
      flex: 1,
    },

  ];


  // Default settings applied to ALL columns.
  const defaultColDef = {
    sortable: true,  // sortable lets you click headers to sort.
    filter: true,   // filter adds a filter icon to the header for quick filtering.
    resizable: true,  // resizable lets you drag column edges.
    autoHeight: true,  // autoHeight makes each row's height adjust automatically to fit its content. 
  };

  // styling the rows of the table
  const getRowStyle = (params) => {
    switch (params.data.Status) {
      case "Complete":
        return { backgroundColor: "#ecfdf5" }; // green tint
      case "Pending":
        return { backgroundColor: "#fef9c3" }; // yellow tint
      case "Canceled":
        return { backgroundColor: "#fee2e2" }; // red tint
      default:
        return null;
    }
  };

  return (
    <div className="m-2 p-2 bg-gray-50 rounded-2xl md:m-10 md:p-10">
      <Header title="Employees" category="Page" />

      {/* ✅ responsive wrapper — fills all available screen space */}
      <div
        className="ag-theme-alpine shadow-xl rounded-xl bg-white p-4"
        style={{
          height: "calc(100vh - 200px)", // ✅ fills screen height dynamically
          width: "100%",                 // ✅ fills full width always
          minHeight: "400px",            // ✅ never collapses on small screens
        }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={10}
          rowHeight={75}
          suppressHorizontalScroll={false} // ✅ allows horizontal scroll on small screens
          getRowStyle={getRowStyle} // ✅ applies row styling based on status
        />
      </div>
    </div>
  );
};

export default Employees;
