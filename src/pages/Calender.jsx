// =================== Setting the Stage (The Imports) ======================================
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
// Imports the main FullCalendar component.
//  This is what actually renders the calendar on screen — the grid of days, the events, the navigation buttons.
import dayGridPlugin from "@fullcalendar/daygrid";  // The month view — a grid of days
import timeGridPlugin from "@fullcalendar/timegrid"; // The week and day views with time slots
import interactionPlugin from "@fullcalendar/interaction";  // Clicking dates, dragging events, selecting ranges
import { scheduleData } from "../data/dummy";
import Header from "../components/Header";

// =================== Start Designings ======================================
const Calendar = () => {
  // =================== The Memory Bank (State Variables)==================================
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

  const [showAddForm, setShowAddForm] = useState(false); // showAddForm: Toggles the visibility of the creation form.
  const [clickedDate, setClickedDate] = useState(""); // clickedDate: Stores the specific date string when a user clicks an empty calendar slot.

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
    // This is the master list of all events.
    // It takes your scheduleData (which might have weird database labels like Subject or CategoryColor) and translates them into the exact language FullCalendar demands (title, backgroundColor). 
    // The extendedProps section is a clever way to attach custom data (like location) that FullCalendar doesn't natively ask for, but that you want to keep track of.
    // This initializes the calendar's events.
    //  It maps the "dummy data" (which uses keys like Subject and StartTime) into the specific format FullCalendar requires (keys like title and start).
  );

  // =================== The Action Engines (Functions)======================
  // These functions are the "verbs" of your application.
  // They dictate what happens when the user interacts with the screen.

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
    // Triggered when you click an existing event.
    // It extracts the event data from the info object provided by FullCalendar and opens the detail modal.
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

  // ================= The Visual Rules (Styling) ===============================
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


// ======================= The Grand Finale (The UI Render) ================================
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



/*

Here is the full story of this component. Imagine you are building a digital planner. This single file is the entire engine, memory, and visual layout for that planner. It doesn't just display a calendar; it handles complex interactions like clicking, drafting, saving, and deleting events.

Here is the line-by-line breakdown of how this "story" unfolds.

Act 1: Setting the Stage (The Imports)
Before the app can do anything, it needs to gather its tools.

import React, { useState } from "react";
This brings in React, the core library, and useState, which is React's "memory." We need useState so the component can remember things (like what event you clicked or what you are typing) while it runs.

import FullCalendar from "@fullcalendar/react";
This is the star of the show. It’s the wrapper that lets the heavy-duty FullCalendar library work inside React.

import dayGridPlugin ... timeGridPlugin ... interactionPlugin
FullCalendar is modular. You only import what you need so the app doesn't get too heavy. dayGrid gives you the standard month view. timeGrid gives you the daily/weekly hourly schedules. interactionPlugin is the secret sauce that makes the calendar clickable and draggable.

import { scheduleData } from "../data/dummy";
This imports a hardcoded list of events (your dummy data) to populate the calendar when it first loads so it isn't empty.

import Header from "../components/Header";
This brings in a simple, custom UI component to display the title at the top of the page.

Act 2: The Memory Bank (State Variables)
Inside const Calendar = () => {, we set up the "brain" of the component using useState. Every time one of these variables changes, React automatically redraws the screen to reflect the new reality.

const [selectedEvent, setSelectedEvent] = useState(null);
This remembers which event you are currently looking at. It starts as null (empty) because you haven't clicked anything yet.

const [showModal, setShowModal] = useState(false);
This is a simple ON/OFF switch. If false, the event details popup is hidden. If true, it dims the screen and shows the popup.

const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "", color: "#03C9D7" });
This is your "draft paper." When you open the form to add a new event, everything you type is temporarily saved in this object. It defaults to an empty title and dates, and a cyan color.

const [showAddForm, setShowAddForm] = useState(false);
Another ON/OFF switch, this time for the "New Event Details" form.

const [clickedDate, setClickedDate] = useState("");
If you click an empty box on the calendar (like next Tuesday), the app saves "next Tuesday's date" here so it can auto-fill the form for you.

const [events, setEvents] = useState( scheduleData.map(...) );
This is the master list of all events. It takes your scheduleData (which might have weird database labels like Subject or CategoryColor) and translates them into the exact language FullCalendar demands (title, backgroundColor). The extendedProps section is a clever way to attach custom data (like location) that FullCalendar doesn't natively ask for, but that you want to keep track of.

Act 3: The Action Engines (Functions)
These functions are the "verbs" of your application. They dictate what happens when the user interacts with the screen.

handleEventClick = (info) => { ... }
The Trigger: You click an existing event block on the calendar.
The Action: It takes the info object (which FullCalendar magically provides, containing all the event's data), extracts the title, times, and location, and saves them into the selectedEvent memory bank. Then, it flips showModal to true to make the popup appear.

handleDateClick = (info) => { ... }
The Trigger: You click an empty, white square on the calendar.
The Action: It notes the exact date you clicked (info.dateStr), updates the newEvent draft paper so the start time matches that date, and flips showAddForm to true so you can start typing the event name.

handleAddEvent = () => { ... }
The Trigger: You click the green "Add Event" button.
The Action: First, it acts as a bouncer: if (!newEvent.title || !newEvent.start) checks if you forgot to add a title or date and yells at you with an alert if you did. If it passes, it creates a brand new event object, generates a random unique ID for it using String(Date.now()), and adds it to the master events list. Finally, it wipes the "draft paper" clean and closes the form.

handleDeleteEvent = () => { ... }
The Trigger: You click the red "Delete Event" button inside the modal.
The Action: It takes the master events list and filters it. It says, "Keep every event except the one whose ID matches the selectedEvent." Then it closes the modal.

Act 4: The Visual Rules (Styling)
const inputStyle = { ... }
Instead of writing the same CSS repeatedly for every text box, this object stores the rules (padding, borders, fonts) to make the inputs look clean and modern.

const colorOptions = [ ... ]
This is an array of color choices. Later, the app will loop through this list to draw little colored circles, allowing the user to pick a category color for their new event.

Act 5: The Grand Finale (The UI Render)
The return ( ... ) statement is where the code becomes visible on the screen.

<div className="m-2 md:m-10 ...">
The main container using Tailwind CSS for spacing and a rounded gray background.

The Add Event Toggle Button:
A button that flips the showAddForm state. Its background color cleverly changes from Cyan to Gray depending on whether the form is open or closed, and the text swaps between "+ Add Event" and "Cancel".

{showAddForm && ( ... )} (The Form):
This entire block only exists on the screen if showAddForm is true. It contains the text inputs for Title, Start Date, and End Date.
The clever part: The onChange={(e) => setNewEvent(...)} code. Every single time you press a key on your keyboard, it updates the newEvent state immediately.
The Color Picker: It uses .map() to loop through colorOptions, drawing a colored circle for each one. If you click a circle, it updates the draft color.

{showModal && selectedEvent && ( ... )} (The Popup):
This only renders if an event is clicked. It creates a dark, fixed overlay (rgba(0,0,0,0.4)).
The Overlay Trick: onClick={() => setShowModal(false)} is on the dark background, so clicking outside the white box closes it. But the white box has onClick={(e) => e.stopPropagation()}—this stops the click from "bleeding through" to the dark background, so clicking inside the box doesn't accidentally close it.

<FullCalendar ... /> (The Main Component):
This mounts the calendar to the page.

plugins={...}: Activates the features imported at the top.

headerToolbar={...}: Sets up the navigation. "prev,next today" on the left, the month title in the center, and the view switchers on the right.

events={events}: Feeds our master list of state events into the visual calendar.

editable, selectable: Allows dragging and dropping.

eventClick and dateClick: Wires up FullCalendar's internal click detectors to the custom action engines (handleEventClick, handleDateClick) we built in Act 3.




*/