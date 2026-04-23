import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
// Imports the main AG Grid component for React.
//  This is the actual table that renders on screen.
//  It's the only component you need from the library —
//  unlike Syncfusion where you needed many different imports.

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
// Two CSS files that style the grid.
//  The first one is the base structural CSS — it handles the layout, borders, and spacing of the grid.
//  The second one is the visual theme — it controls colors, fonts, and shadows.
//  Without both of these the grid would look completely broken.


import {
  ModuleRegistry,  // The system that activates all modules
  ClientSideRowModelModule,  // Basic grid rendering — always required
  PaginationModule,  // Pagination bar at the bottom
  TextFilterModule,  // Filter on text columns
  NumberFilterModule,  // Filter on number columns
  RowSelectionModule,   // Enables row selection and checkboxes
} from "ag-grid-community";

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  PaginationModule,
  TextFilterModule,
  NumberFilterModule,
  RowSelectionModule,
]);
// Activates all the imported modules.
//  This runs once when the file loads — before the component even renders.
//  Without this step the grid renders empty with no features even if the imports are correct. 
// Think of it as flipping on the power switches.


import { customersData } from "../data/dummy";
import Header from "../components/Header";

const Customers = () => {
  const [rowData, setRowData] = useState(customersData);
  // Creates a state variable rowData that holds all the customer rows.
  //  setRowData is the function used to update it.
  //  Starting value is customersData from your dummy file. 
  // When setRowData is called with new data, the grid automatically re-renders to show the changes.

  const [selectedRows, setSelectedRows] = useState([]);
  // Tracks which rows are currently checked.
  //  Starts as an empty array [] meaning nothing is selected. 
  // When the user checks rows, their CustomerID values get stored here.
  //  This is used by the delete button to know which rows to remove.

  const [showForm, setShowForm] = useState(false);
  // Controls whether the "Add Customer" form is visible or hidden.
  //  Starts as false meaning the form is hidden.
  //  When the user clicks "+ Add Customer", it becomes true and the form appears.

  const [newRow, setNewRow] = useState({
    CustomerName: "",
    CustomerEmail: "",
    ProjectName: "",
    Status: "Active",
    StatusBg: "#8BE78B",
    Weeks: "",
    Budget: "",
    Location: "",
  });
  // Stores what the user is typing into the add form. 
  // Each property matches a field in the form. 
  // Status defaults to "Active" and StatusBg defaults to green "#8BE78B" 
  // so the form has sensible starting values.
  //  Every time the user types in an input this object gets updated.

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRow((prev) => ({ ...prev, [name]: value }));
  };
  // Runs every time the user types in any input field.
  //  e.target is the input element that was typed into.
  //  name is the input's name attribute (like "CustomerName").
  //  value is what was typed. { ...prev, [name]: value } copies all existing form values and updates only the one field that changed. 
  // The [name] with square brackets means it's a dynamic key — it could be any field name.


  const handleAddRow = () => {
    // checks if the required fields CustomerName and ProjectName are filled in.
    if (!newRow.CustomerName || !newRow.ProjectName) {
      alert("Please fill in at least Name and Project Name");
      return;
    }
    // Runs when the user clicks "Add Customer". 
    // First it validates — if CustomerName or ProjectName is empty,
    //  it shows an alert and stops with return.
    //  The ! means "not" — !newRow.CustomerName means "if CustomerName is empty".

    const newCustomer = {
      ...newRow,
      CustomerID: Date.now(),
      CustomerImage: "https://via.placeholder.com/40",
    };
    // Creates the complete new customer object.
    //  ...newRow spreads all the form values into the object. 
    // Date.now() generates a unique ID using the current timestamp in milliseconds — guaranteed to be unique every time.
    //  CustomerImage gets a placeholder image since the form doesn't have an image upload.

    setRowData((prev) => [...prev, newCustomer]);
    // Adds the new customer to the grid. 
    // prev is the current array of all rows. 
    // [...prev, newCustomer] creates a new array with all existing rows plus the new one at the end. 
    // AG Grid detects the state change and automatically re-renders to show the new row.

    setNewRow({
      CustomerName: "",
      CustomerEmail: "",
      ProjectName: "",
      Status: "Active",
      StatusBg: "#8BE78B",
      Weeks: "",
      Budget: "",
      Location: "",
    });
    setShowForm(false);
  };
  // Resets the form back to empty after adding. 
  // setShowForm(false) hides the form.
  //  This gives a clean slate for the next time the user wants to add a customer.

  const handleDelete = () => {
    const remainingRows = rowData.filter(
      (row) => !selectedRows.includes(row.CustomerID)
    );
    setRowData(remainingRows);
    setSelectedRows([]);
  };
  // Deletes all selected rows.
  // .filter() loops through every row and keeps only the ones whose CustomerID is NOT in the selectedRows array. 
  // !selectedRows.includes(row.CustomerID) means "keep this row if its ID is not in the selected list". setRowData(remainingRows) updates the grid with the filtered rows. setSelectedRows([]) clears the selection.


  const columnDefs = [
    {
      headerName: "Name",
      field: "CustomerName",
      minWidth: 180,
      flex: 2,
      // ✅ put checkboxSelection here on the FIRST data column
      checkboxSelection: true,  //  adds a checkbox to every cell in this column
      headerCheckboxSelection: true, // adds a "select all" checkbox in the column header — clicking it selects or deselects all visible rows at once.

      cellRenderer: (params) => (
        <div className="flex items-center gap-3 h-full">
          <img
            src={params.data.CustomerImage}
            alt={params.data.CustomerName}
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
          <div>
            <p style={{ fontWeight: "500", color: "#1e293b", fontSize: "13px" }}>
              {params.data.CustomerName}
            </p>
            <p style={{ color: "#94a3b8", fontSize: "11px" }}>
              {params.data.CustomerEmail}
            </p>
          </div>
        </div>
        /*
        cellRenderer replaces the default plain text with custom JSX.
        params is the object AG Grid passes to every renderer containing information about the current cell and row.
        params.data is the entire row object — used to access CustomerImage, CustomerName, and CustomerEmail all in the same cell.
        borderRadius: "50%" makes the image perfectly round. 
        objectFit: "cover" fills the circle without stretching. 
        flexShrink: 0 prevents the image from shrinking when the column is narrow.

        */
      ),
    },

    {
      headerName: "Project Name",
      field: "ProjectName",
      minWidth: 150,
      flex: 2,
    },

    {
      headerName: "Status",
      field: "Status",
      minWidth: 120,
      flex: 1,

      cellRenderer: (params) => (
        <div className="flex items-center gap-2 h-full">
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: params.data.StatusBg,
              flexShrink: 0,
            }}
          />
          <span style={{ color: "#475569", fontSize: "13px" }}>
            {params.value}
          </span>
        </div>
        /*
        The Status column with a colored dot. 
        params.data.StatusBg gets the color value from the row — like "#8BE78B" for Active or "red" for Cancel.
         params.value is the Status text like "Active". The small 10px circle is created with borderRadius: "50%" on a div — no image or icon needed.
        */
      ),
    },

    {
      headerName: "Weeks",
      field: "Weeks",
      minWidth: 90,
      flex: 1,
    },

    {
      headerName: "Budget",
      field: "Budget",
      minWidth: 100,
      flex: 1,
      cellRenderer: (params) => (
        <div className="flex items-center h-full">
          <span style={{ fontWeight: "600", color: "#059669" }}>
            {params.value}
          </span>
        </div>
      ),
    },

    {
      headerName: "Location",
      field: "Location",
      minWidth: 110,
      flex: 1,
    },

    {
      headerName: "Customer ID",
      field: "CustomerID",
      minWidth: 120,
      flex: 1,
      cellRenderer: (params) => (
        <div className="flex items-center h-full">
          <span style={{ color: "#94a3b8", fontSize: "13px" }}>
            #{params.value}
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

  //  reusable style object applied to every input field in the form.
  const inputStyle = {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    fontSize: "13px",
    width: "100%",
    outline: "none",
    color: "#1e293b",
    background: "white",
  };

  return (
    <div className="m-2 p-2 bg-gray-50 rounded-4xl md:m-10 md:p-10">
      <Header title="Customers" category="Page" />

      {/* Action buttons */}
      <div className="flex justify-between items-center mb-3">
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            background: showForm ? "#64748b" : "#3b82f6",
            color: "white",
            padding: "8px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontWeight: "500",
            fontSize: "14px",
          }}
        >
          {showForm ? "Cancel" : "+ Add Customer"}
        </button>

        <button
          onClick={handleDelete}
          disabled={selectedRows.length === 0}
          style={{
            background: selectedRows.length === 0 ? "#e2e8f0" : "#ef4444",
            color: selectedRows.length === 0 ? "#94a3b8" : "white",
            padding: "8px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: selectedRows.length === 0 ? "not-allowed" : "pointer",
            fontWeight: "500",
            fontSize: "14px",
          }}
        >
          {selectedRows.length === 0
            ? "Select rows to delete"
            : `Delete (${selectedRows.length})`}
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div
          style={{
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "16px",
          }}
        >
          <p style={{ fontWeight: "500", marginBottom: "14px", color: "#1e293b" }}>
            New Customer Details
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "12px",
            }}
          >
            <input style={inputStyle} name="CustomerName" placeholder="Customer Name *" value={newRow.CustomerName} onChange={handleInputChange} />
            <input style={inputStyle} name="CustomerEmail" placeholder="Email" value={newRow.CustomerEmail} onChange={handleInputChange} />
            <input style={inputStyle} name="ProjectName" placeholder="Project Name *" value={newRow.ProjectName} onChange={handleInputChange} />
            <input style={inputStyle} name="Weeks" placeholder="Weeks" value={newRow.Weeks} onChange={handleInputChange} />
            <input style={inputStyle} name="Budget" placeholder="Budget e.g. $2.4k" value={newRow.Budget} onChange={handleInputChange} />
            <input style={inputStyle} name="Location" placeholder="Location" value={newRow.Location} onChange={handleInputChange} />
            <select
              style={inputStyle}
              name="Status"
              value={newRow.Status}
              onChange={(e) => {
                const statusColors = {
                  Active: "#8BE78B",
                  Pending: "#FEC90F",
                  Completed: "#8BE78B",
                  Cancel: "red",
                };
                setNewRow((prev) => ({
                  ...prev,
                  Status: e.target.value,
                  StatusBg: statusColors[e.target.value] || "#8BE78B",
                }));
              }}
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancel">Cancel</option>
            </select>
          </div>
          <button
            onClick={handleAddRow}
            style={{
              marginTop: "14px",
              background: "#22c55e",
              color: "white",
              padding: "8px 24px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: "500",
              fontSize: "14px",
            }}
          >
            Add Customer
          </button>
        </div>
      )}

      {/* Grid */}
      <div
        className="ag-theme-quartz"
        style={{
          height: "calc(100vh - 250px)",
          width: "100%",
          minHeight: "400px",
          borderRadius: "0px",
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
          paginationPageSizeSelector={false}
          rowHeight={65}
          suppressHorizontalScroll={false}
          rowSelection="multiple"             // ✅ v33 accepts simple string again
          // suppressRowClickSelection={true}    // ✅ only select via checkbox not row click
          onSelectionChanged={(e) => {
            const selected = e.api
              .getSelectedRows()
              .map((row) => row.CustomerID);
            setSelectedRows(selected);
          }}
        // Fires every time the selection changes.
        // e.api.getSelectedRows() returns the full data objects of all selected rows.
        // .map(row => row.CustomerID) extracts just the IDs and stores them in selectedRows state — which the delete button uses
        />
      </div>
    </div>
  );
};

export default Customers;