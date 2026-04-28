import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// The best drag and drop for React.
//  It's a maintained fork of the original react-beautiful-dnd by Atlassian (the company that makes Jira).
//  Supports React 18 and 19. Provides smooth animations and accessibility out of the box
import { kanbanData } from "../data/dummy";
import Header from "../components/Header";

const Kanban = () => {

  // ✅ Define the 4 columns with their titles and key fields
  const columns = [
    { id: "Open", title: "To Do", color: "#1d4ed8", bg: "#eff6ff" },
    { id: "InProgress", title: "In Progress", color: "#d97706", bg: "#fffbeb" },
    { id: "Testing", title: "Testing", color: "#7c3aed", bg: "#f5f3ff" },
    { id: "Close", title: "Done", color: "#059669", bg: "#f0fdf4" },
  ];

  // ✅ Group kanbanData tasks by their Status field into separate columns
  // reduce() loops through every task and places it into the right column array
  const groupTasksByStatus = (tasks) =>
    tasks.reduce((acc, task) => {
      // if this status key doesn't exist yet, create an empty array for it
      if (!acc[task.Status]) acc[task.Status] = [];
      // push the task into its matching column
      acc[task.Status].push(task);
      return acc;
    }, {});

  // ✅ Store the grouped tasks in state so we can update them when dragging
  const [tasks, setTasks] = useState(groupTasksByStatus(kanbanData));

  // ✅ This runs automatically when the user drops a card
  const onDragEnd = (result) => {
    const { source, destination } = result;

    // if dropped outside any column — do nothing
    if (!destination) return;

    // if dropped in the exact same position — do nothing
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    // get the source column's tasks array
    const sourceCol = [...(tasks[source.droppableId] || [])];

    // get the destination column's tasks array
    const destCol = [...(tasks[destination.droppableId] || [])];

    // remove the dragged card from its original position
    const [movedTask] = sourceCol.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      // ✅ Moving within the same column — just reorder
      sourceCol.splice(destination.index, 0, movedTask);
      setTasks((prev) => ({
        ...prev,
        [source.droppableId]: sourceCol,
      }));
    } else {
      // ✅ Moving to a different column — remove from source, add to destination
      destCol.splice(destination.index, 0, movedTask);
      setTasks((prev) => ({
        ...prev,
        [source.droppableId]: sourceCol,
        [destination.droppableId]: destCol,
      }));
    }
  };

  // ✅ Color badge for each task type
  const typeColors = {
    Story: { bg: "#eff6ff", color: "#1d4ed8" },
    Bug: { bg: "#fff1f2", color: "#e11d48" },
    Improvement: { bg: "#f0fdf4", color: "#059669" },
    Epic: { bg: "#f5f3ff", color: "#7c3aed" },
    Others: { bg: "#fafafa", color: "#64748b" },
  };

  // ✅ Color badge for each priority level
  const priorityColors = {
    Low: { bg: "#f0fdf4", color: "#059669" },
    Normal: { bg: "#eff6ff", color: "#1d4ed8" },
    High: { bg: "#fff7ed", color: "#d97706" },
    Critical: { bg: "#fff1f2", color: "#e11d48" },
  };

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header title="Kanban" category="App" />

      {/*
        DragDropContext — wraps the entire drag and drop area
        onDragEnd — the function that runs when a user finishes dragging
        Everything inside this must be wrapped in DragDropContext
      */}
      <DragDropContext onDragEnd={onDragEnd}>

        {/* Horizontal scrollable container for all columns */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            overflowX: "auto",         // allows horizontal scrolling on small screens
            paddingBottom: "16px",
            alignItems: "flex-start",  // columns start from the top
          }}
        >
          {/* Loop through each column definition */}
          {columns.map((col) => (
            <div
              key={col.id}
              style={{
                minWidth: "260px",           // each column has a minimum width
                maxWidth: "280px",
                flex: "0 0 260px",           // columns don't shrink or grow
                background: col.bg,          // light background matching column color
                borderRadius: "12px",
                padding: "16px",
                border: `1px solid ${col.color}22`, // very light border
              }}
            >
              {/* Column header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "14px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {/* Colored dot next to column title */}
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: col.color,
                    }}
                  />
                  <span style={{ fontWeight: "600", fontSize: "14px", color: "#1e293b" }}>
                    {col.title}
                  </span>
                </div>

                {/* Task count badge */}
                <span
                  style={{
                    background: col.color,
                    color: "white",
                    borderRadius: "99px",
                    padding: "2px 10px",
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  {(tasks[col.id] || []).length}
                </span>
              </div>

              {/*
                Droppable — defines a droppable zone (a column)
                droppableId — unique ID for this drop zone, matches the task Status
                Each column must have its own unique droppableId
              */}
              <Droppable droppableId={col.id}>
                {(provided, snapshot) => (
                  <div
                    // ref connects this div to the Droppable system
                    ref={provided.innerRef}
                    // spread droppable props needed by the library
                    {...provided.droppableProps}
                    style={{
                      minHeight: "100px",     // column stays visible even when empty
                      transition: "background 0.2s",
                      // highlight the column when a card is being dragged over it
                      background: snapshot.isDraggingOver
                        ? `${col.color}18`
                        : "transparent",
                      borderRadius: "8px",
                      padding: "4px",
                    }}
                  >
                    {/* Loop through tasks in this column */}
                    {(tasks[col.id] || []).map((task, index) => (
                      /*
                        Draggable — makes each card draggable
                        key — unique React key for each card
                        draggableId — must be a unique STRING for the library
                        index — position of this card in the column
                      */
                      <Draggable
                        key={task.Id}
                        draggableId={String(task.Id)}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            // ref connects this div to the Draggable system
                            ref={provided.innerRef}
                            // spread drag handle and draggable props
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              background: "white",
                              borderRadius: "10px",
                              padding: "14px",
                              marginBottom: "10px",
                              boxShadow: snapshot.isDragging
                                // stronger shadow while dragging for lifted effect
                                ? "0 8px 24px rgba(0,0,0,0.15)"
                                : "0 1px 4px rgba(0,0,0,0.06)",
                              border: `1px solid ${snapshot.isDragging ? col.color : "#f1f5f9"}`,
                              cursor: "grab",
                              transition: "box-shadow 0.2s, border 0.2s",
                              // spread draggable style — required for position tracking
                              ...provided.draggableProps.style,
                            }}
                          >
                            {/* Top row — Type badge + Priority badge */}
                            <div
                              style={{
                                display: "flex",
                                gap: "6px",
                                marginBottom: "10px",
                                flexWrap: "wrap",
                              }}
                            >
                              {/* Task type badge — Story, Bug, Epic, etc */}
                              <span
                                style={{
                                  background: typeColors[task.Type]?.bg || "#f1f5f9",
                                  color: typeColors[task.Type]?.color || "#64748b",
                                  padding: "2px 8px",
                                  borderRadius: "99px",
                                  fontSize: "11px",
                                  fontWeight: "500",
                                }}
                              >
                                {task.Type}
                              </span>

                              {/* Priority badge — Low, Normal, High, Critical */}
                              <span
                                style={{
                                  background: priorityColors[task.Priority]?.bg || "#f1f5f9",
                                  color: priorityColors[task.Priority]?.color || "#64748b",
                                  padding: "2px 8px",
                                  borderRadius: "99px",
                                  fontSize: "11px",
                                  fontWeight: "500",
                                }}
                              >
                                {task.Priority}
                              </span>
                            </div>

                            {/* Task title */}
                            <p
                              style={{
                                fontSize: "13px",
                                fontWeight: "600",
                                color: "#1e293b",
                                marginBottom: "6px",
                                lineHeight: "1.4",
                              }}
                            >
                              {task.Title}
                            </p>

                            {/* Task summary/description */}
                            <p
                              style={{
                                fontSize: "12px",
                                color: "#64748b",
                                lineHeight: "1.5",
                                marginBottom: "12px",
                              }}
                            >
                              {task.Summary}
                            </p>

                            {/* Tags row */}
                            {task.Tags && (
                              <div
                                style={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: "4px",
                                  marginBottom: "12px",
                                }}
                              >
                                {/* Split Tags string by comma and render each tag */}
                                {task.Tags.split(",").map((tag) => (
                                  <span
                                    key={tag}
                                    style={{
                                      background: "#f8fafc",
                                      color: "#64748b",
                                      border: "1px solid #e2e8f0",
                                      padding: "1px 6px",
                                      borderRadius: "4px",
                                      fontSize: "10px",
                                    }}
                                  >
                                    {tag.trim()}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Bottom row — Assignee + Estimate */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                borderTop: "1px solid #f1f5f9",
                                paddingTop: "10px",
                              }}
                            >
                              {/* Assignee avatar — first letter of name in a circle */}
                              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                <div
                                  style={{
                                    width: "26px",
                                    height: "26px",
                                    borderRadius: "50%",
                                    background: col.color,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "white",
                                    fontSize: "11px",
                                    fontWeight: "600",
                                    flexShrink: 0,
                                  }}
                                >
                                  {/* First letter of assignee name */}
                                  {task.Assignee?.charAt(0).toUpperCase()}
                                </div>
                                <span style={{ fontSize: "11px", color: "#64748b" }}>
                                  {task.Assignee}
                                </span>
                              </div>

                              {/* Estimate in hours */}
                              <span
                                style={{
                                  fontSize: "11px",
                                  color: "#94a3b8",
                                  fontWeight: "500",
                                }}
                              >
                                {task.Estimate}h
                              </span>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {/*
                      provided.placeholder — MUST always be included inside Droppable
                      It reserves space for the card being dragged so other cards
                      don't jump around while dragging is in progress
                    */}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Kanban;