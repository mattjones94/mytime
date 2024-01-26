// App.js
import React, { useState } from "react";
import "./App.css";
import Calendar from "./components/Calendar";
import Events from "./components/Events";
import Header from "./components/Header";
import AddEventButton from "./components/AddEvent";
import eventsData from "./data/eventsData";
import ProximityEventCard from "./components/ProximityEventCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { addEvent, updateEvent } from "./data/dataService";

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [originalEvents, setOriginalEvents] = useState(eventsData);
  const [newlyAddedEvents, setNewlyAddedEvents] = useState([]);

  const handleDayClick = (newSelectedDate) => {
    setSelectedDate(newSelectedDate);
  };

  const handleUpdate = (oldEvent, updatedEvent) => {
    setOriginalEvents((prevEvents) => {
      const updatedEvents = prevEvents.map((event) =>
        event.id === oldEvent.id ? updatedEvent : event
      );
      return updatedEvents;
    });
    setNewlyAddedEvents((prevEvents) => {
      const updatedEvents = prevEvents.map((event) =>
        event.id === oldEvent.id ? updatedEvent : event
      );
      return updatedEvents;
    });
  };

  const handleCalendarIconClick = (date) => {
    setSelectedDate(date);
    // Add any additional logic related to calendar icon click
  };

  const onToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const onAddEvent = (newEvent) => {
    // Find the maximum existing ID
    const maxId = Math.max(...originalEvents.map((event) => event.id));

    // Use the maximum ID + 1 as the new ID
    newEvent.id = maxId + 1;

    // Ensure the new event has a category
    newEvent.category = newEvent.category || "default";

    setNewlyAddedEvents((prevEvents) => [...prevEvents, newEvent]);
    addEvent(newEvent);
  };

  const combinedEvents = [...originalEvents, ...newlyAddedEvents];

  return (
    <div className={`App ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <Header
        eventsData={combinedEvents} // Use combinedEvents instead of eventsData
        onCalendarIconClick={handleCalendarIconClick}
        onToggleDarkMode={onToggleDarkMode}
        isDarkMode={isDarkMode}
      />
      <div className="master-container">
        <div className="proximity-calendar-container">
          <p className="upcoming-events-title">Upcoming Events:</p>
          <ProximityEventCard eventsData={combinedEvents} />
          <Calendar
            selectedDate={selectedDate}
            onDayClick={handleDayClick}
            eventsData={combinedEvents}
            onCalendarIconClick={handleCalendarIconClick}
          />
          {isDarkMode ? (
            <div className="dark-mode-moon">
              <FontAwesomeIcon
                icon={faMoon}
                style={{ color: "#1E3050", transform: "translateY(0)" }}
              />
            </div>
          ) : (
            <div className="light-mode-sun">
              <FontAwesomeIcon
                icon={faSun}
                style={{ color: "#fcff5c", transform: "translateY(0)" }}
              />
            </div>
          )}
        </div>
        <div className="master-events-container">
          <Events
            selectedDate={selectedDate}
            events={combinedEvents}
            onUpdate={handleUpdate}
          />
          <AddEventButton onAddEvent={onAddEvent} />
        </div>
      </div>
    </div>
  );
}

export default App;
