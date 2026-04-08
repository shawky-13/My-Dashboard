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


import { ordersData } from "../data/dummy";
import Header from "../components/Header";



const Orders = () => {

  const [rowData] = useState(ordersData);
  // Stores ordersData in React state. The [rowData] without a setter means the data never changes — it's read-only.
  //  If you wanted to update rows later you'd write const [rowData, setRowData] = useState(ordersData).


  const columnDefs = [
    // An array where each object defines one column of the grid.
    //  This replaces ColumnsDirective + ColumnDirective from Syncfusion.

    {
      headerName: "Image",
      // headerName: column title.
      field: "ProductImage",
      // field: which property from rowData to display.
      minWidth: 100,
      // minWidth and flex: control responsive sizing.
      flex: 1,
      cellRenderer: (params) => (
        <div className="flex items-center justify-center h-full">
          <img
            src={params.value}
            alt="product"
            style={{
              height: "66px",
              width: "66px",
              objectFit: "cover",  //  objectFit: "cover" => makes the image fill the box without stretching.
              borderRadius: "20px",
            }}
          />
        </div>
      ),
      // cellRenderer: custom rendering logic. Here, it shows a product image inside a styled div.
    },


    {
      headerName: "Item",
      field: "OrderItems",
      minWidth: 120,
      flex: 2,
    },

    {
      headerName: "Customer",
      field: "CustomerName",
      minWidth: 130,
      flex: 2,
    },

    {
      headerName: "Amount",
      field: "TotalAmount",
      minWidth: 100,
      flex: 1,
      valueFormatter: (params) => `$${params.value}`,  // valueFormatter transforms the raw value before displaying it. 
      // params.value is 32.38 and the formatter turns it into $32.38.

    },

    {
      headerName: "Status",
      field: "Status",
      minWidth: 110,
      flex: 1,
      cellRenderer: (params) => (
        <div className="flex items-center justify-center h-full">
          <button
            style={{
              background: params.data.StatusBg,
              padding: "2px 10px",
              borderRadius: "20px",
              color: "white",
              fontSize: "12px",
              textTransform: "capitalize",
              border: "none",
              cursor: "default",
              whiteSpace: "nowrap",
            }}
          >
            {params.value}
          </button>
        </div>
      ),

    },

    {
      headerName: "Order ID",
      field: "OrderID",
      minWidth: 100,
      flex: 1,
    },

    {
      headerName: "Location",
      field: "Location",
      minWidth: 100,
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
      <Header title="Orders" category="Page" />

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

export default Orders;




/*
         This is another version of the Orders.jsx file with another styling approach. It uses a different color scheme and slightly different layout for the cells, but the core functionality remains the same. You can choose either version based on your design preferences.


import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import {
  ModuleRegistry,
  ClientSideRowModelModule,
  PaginationModule,
  TextFilterModule,
  NumberFilterModule,
} from "ag-grid-community";

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  PaginationModule,
  TextFilterModule,
  NumberFilterModule,
]);

import { ordersData } from "../data/dummy";
import Header from "../components/Header";

const Orders = () => {
  const [rowData] = useState(ordersData);

  const columnDefs = [
    {
      headerName: "Product",
      field: "ProductImage",
      minWidth: 100,
      flex: 1,
      cellRenderer: (params) => (
        <div className="flex items-center justify-center h-full py-2">
          <img
            src={params.value}
            alt="product"
            style={{
              height: "60px",
              width: "60px",
              objectFit: "cover",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
            }}
          />
        </div>
      ),
    },
    {
      headerName: "Item",
      field: "OrderItems",
      minWidth: 130,
      flex: 2,
      cellRenderer: (params) => (
        <div className="flex items-center h-full">
          <span style={{ fontWeight: "500", color: "#1e293b" }}>
            {params.value}
          </span>
        </div>
      ),
    },
    {
      headerName: "Customer",
      field: "CustomerName",
      minWidth: 130,
      flex: 2,
      cellRenderer: (params) => (
        <div className="flex items-center gap-2 h-full">
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "13px",
              fontWeight: "600",
              flexShrink: 0,
            }}
          >
            {params.value.charAt(0).toUpperCase()}
          </div>
          <span style={{ fontWeight: "500", color: "#1e293b" }}>
            {params.value}
          </span>
        </div>
      ),
    },
    {
      headerName: "Amount",
      field: "TotalAmount",
      minWidth: 110,
      flex: 1,
      valueFormatter: (params) => `$${params.value}`,
      cellRenderer: (params) => (
        <div className="flex items-center h-full">
          <span
            style={{
              fontWeight: "600",
              color: "#059669",
              fontSize: "14px",
            }}
          >
            ${params.value}
          </span>
        </div>
      ),
    },
    {
      headerName: "Status",
      field: "Status",
      minWidth: 120,
      flex: 1,
      cellRenderer: (params) => (
        <div className="flex items-center justify-center h-full">
          <span
            style={{
              background: params.data.StatusBg,
              padding: "4px 14px",
              borderRadius: "20px",
              color: "white",
              fontSize: "11px",
              fontWeight: "600",
              textTransform: "capitalize",
              letterSpacing: "0.5px",
              whiteSpace: "nowrap",
            }}
          >
            {params.value}
          </span>
        </div>
      ),
    },
    {
      headerName: "Order ID",
      field: "OrderID",
      minWidth: 110,
      flex: 1,
      cellRenderer: (params) => (
        <div className="flex items-center h-full">
          <span style={{ color: "#64748b", fontSize: "13px" }}>
            #{params.value}
          </span>
        </div>
      ),
    },
    {
      headerName: "Location",
      field: "Location",
      minWidth: 110,
      flex: 1,
      cellRenderer: (params) => (
        <div className="flex items-center gap-1 h-full">
          <span style={{ color: "#64748b", fontSize: "13px" }}>
            {params.value}
          </span>
        </div>
      ),
    },
  ];

  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    autoHeight: true,
  };

  const getRowStyle = (params) => {
    switch (params.data.Status) {
      case "complete":
        return { backgroundColor: "#f0fdf4" };
      case "pending":
        return { backgroundColor: "#fefce8" };
      case "canceled":
        return { backgroundColor: "#fff1f2" };
      case "active":
        return { backgroundColor: "#eff6ff" };
      case "rejected":
        return { backgroundColor: "#fdf2f8" };
      default:
        return { backgroundColor: "#ffffff" };
    }
  };

  return (
    <div className="m-2 p-2 md:m-10 md:p-10">
      <Header title="Orders" category="Page" />

      <div
        className="ag-theme-quartz"
        style={{
          height: "calc(100vh - 220px)",
          width: "100%",
          minHeight: "400px",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={10}
          rowHeight={80}
          suppressHorizontalScroll={false}
          getRowStyle={getRowStyle}
        />
      </div>
    </div>
  );
};

export default Orders;





*/