import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
// Imports the main FullCalendar component.
//  This is what actually renders the calendar on screen — the grid of days, the events, the navigation buttons.
import dayGridPlugin from "@fullcalendar/daygrid";  // The month view — a grid of days
import timeGridPlugin from "@fullcalendar/timegrid"; // The week and day views with time slots
import interactionPlugin from "@fullcalendar/interaction";  // Clicking dates, dragging events, selecting ranges

import { scheduleData } from "../data/dummy";
import Header from "../components/Header";

const Calendar = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  // Stores the event the user clicked on.
  //  Starts as null meaning no event is selected.
  //  When the user clicks an event, its data gets stored here and the modal opens to show its details.

  const [showModal, setShowModal] = useState(false);
  // Controls whether the event detail modal is visible.
  //  Starts as false (hidden). Becomes true when the user clicks an existing event, showing the modal with event details.

  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    color: "#03C9D7",
  });
  //  Stores what the user is typing in the Add Event form.
  //  Four fields — title is the event name, start is the start date/time, end is the end date/time, color defaults to cyan "#03C9D7".
  //  Every time the user types or picks a color, this object gets updated.

  const [showAddForm, setShowAddForm] = useState(false);
  const [clickedDate, setClickedDate] = useState("");

  // ✅ convert scheduleData from dummy.jsx to FullCalendar format
  const [events, setEvents] = useState(
    scheduleData.map((item) => ({
      id: String(item.Id),
      title: item.Subject,
      start: item.StartTime,
      end: item.EndTime,
      backgroundColor: item.CategoryColor,
      borderColor: item.CategoryColor,
      extendedProps: {
        location: item.Location,
        color: item.CategoryColor,
      },
    }))
  );

  // ✅ runs when user clicks on an existing event
  const handleEventClick = (info) => {
    setSelectedEvent({
      id: info.event.id,
      title: info.event.title,
      start: info.event.startStr,
      end: info.event.endStr,
      location: info.event.extendedProps.location,
      color: info.event.backgroundColor,
    });
    setShowModal(true);
  };

  // ✅ runs when user clicks on an empty date
  const handleDateClick = (info) => {
    setClickedDate(info.dateStr);
    setNewEvent((prev) => ({ ...prev, start: info.dateStr }));
    setShowAddForm(true);
  };

  // ✅ adds a new event to the calendar
  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.start) {
      alert("Please fill in the title and start date");
      return;
    }
    const eventToAdd = {
      id: String(Date.now()),
      title: newEvent.title,
      start: newEvent.start,
      end: newEvent.end || newEvent.start,
      backgroundColor: newEvent.color,
      borderColor: newEvent.color,
      extendedProps: {
        location: "",
        color: newEvent.color,
      },
    };
    setEvents((prev) => [...prev, eventToAdd]);
    setNewEvent({ title: "", start: "", end: "", color: "#03C9D7" });
    setShowAddForm(false);
  };

  // ✅ deletes the selected event
  const handleDeleteEvent = () => {
    setEvents((prev) => prev.filter((e) => e.id !== selectedEvent.id));
    setShowModal(false);
    setSelectedEvent(null);
  };

  const inputStyle = {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    fontSize: "13px",
    width: "100%",
    outline: "none",
    color: "#1e293b",
    background: "white",
    marginBottom: "10px",
  };

  const colorOptions = [
    { label: "Cyan", value: "#03C9D7" },
    { label: "Green", value: "#1aaa55" },
    { label: "Blue", value: "#357cd2" },
    { label: "Orange", value: "#f57f17" },
    { label: "Red", value: "#ea7a57" },
    { label: "Purple", value: "#7fa900" },
  ];

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-gray-50 rounded-3xl">
      <Header title="Calendar" category="App" />

      {/* ✅ Add Event button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          style={{
            background: showAddForm ? "#64748b" : "#03C9D7",
            color: "white",
            padding: "8px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontWeight: "500",
            fontSize: "14px",
          }}
        >
          {showAddForm ? "Cancel" : "+ Add Event"}
        </button>
      </div>

      {/* ✅ Add Event Form */}
      {showAddForm && (
        <div
          style={{
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <p style={{ fontWeight: "500", marginBottom: "14px", color: "#1e293b" }}>
            New Event Details
          </p>

          <input
            style={inputStyle}
            placeholder="Event Title *"
            value={newEvent.title}
            onChange={(e) => setNewEvent((prev) => ({ ...prev, title: e.target.value }))}
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <div>
              <label style={{ fontSize: "12px", color: "#64748b", display: "block", marginBottom: "4px" }}>
                Start Date *
              </label>
              <input
                style={inputStyle}
                type="datetime-local"
                value={newEvent.start}
                onChange={(e) => setNewEvent((prev) => ({ ...prev, start: e.target.value }))}
              />
            </div>
            <div>
              <label style={{ fontSize: "12px", color: "#64748b", display: "block", marginBottom: "4px" }}>
                End Date
              </label>
              <input
                style={inputStyle}
                type="datetime-local"
                value={newEvent.end}
                onChange={(e) => setNewEvent((prev) => ({ ...prev, end: e.target.value }))}
              />
            </div>
          </div>

          {/* Color picker */}
          <div style={{ marginBottom: "12px" }}>
            <label style={{ fontSize: "12px", color: "#64748b", display: "block", marginBottom: "8px" }}>
              Event Color
            </label>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {colorOptions.map((c) => (
                <div
                  key={c.value}
                  onClick={() => setNewEvent((prev) => ({ ...prev, color: c.value }))}
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: c.value,
                    cursor: "pointer",
                    border: newEvent.color === c.value
                      ? "3px solid #1e293b"
                      : "3px solid transparent",
                    transition: "border 0.2s",
                  }}
                  title={c.label}
                />
              ))}
            </div>
          </div>

          <button
            onClick={handleAddEvent}
            style={{
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
            Add Event
          </button>
        </div>
      )}

      {/* ✅ Event detail modal — shows when clicking an event */}
      {showModal && selectedEvent && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "28px",
              minWidth: "320px",
              maxWidth: "400px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()} // prevents closing when clicking inside
          >
            {/* Color bar at top */}
            <div
              style={{
                height: "6px",
                borderRadius: "4px",
                background: selectedEvent.color,
                marginBottom: "16px",
              }}
            />

            <h3 style={{ fontWeight: "600", fontSize: "18px", color: "#1e293b", marginBottom: "12px" }}>
              {selectedEvent.title}
            </h3>

            <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "8px" }}>
              <span style={{ fontWeight: "500", color: "#1e293b" }}>Start: </span>
              {new Date(selectedEvent.start).toLocaleString()}
            </div>

            {selectedEvent.end && (
              <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "8px" }}>
                <span style={{ fontWeight: "500", color: "#1e293b" }}>End: </span>
                {new Date(selectedEvent.end).toLocaleString()}
              </div>
            )}

            {selectedEvent.location && (
              <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "16px" }}>
                <span style={{ fontWeight: "500", color: "#1e293b" }}>Location: </span>
                {selectedEvent.location}
              </div>
            )}

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button
                onClick={handleDeleteEvent}
                style={{
                  flex: 1,
                  background: "#ef4444",
                  color: "white",
                  padding: "8px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "500",
                  fontSize: "14px",
                }}
              >
                Delete Event
              </button>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  flex: 1,
                  background: "#f1f5f9",
                  color: "#475569",
                  padding: "8px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "500",
                  fontSize: "14px",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ The actual calendar */}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={3}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        height="auto"
        eventDisplay="block"
      />
    </div>
  );
};

export default Calendar;