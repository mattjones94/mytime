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
import { getEvents, addEvent } from "./data/dataService";

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [originalEvents, setOriginalEvents] = useState(eventsData);
  const [newlyAddedEvents, setNewlyAddedEvents] = useState([]);

  const handleDayClick = (newSelectedDate) => {
    setSelectedDate(newSelectedDate);
  };

  const handleCalendarIconClick = (date) => {
    setSelectedDate(date);
    const month = date.getMonth();
    const year = date.getFullYear();
    // Add any additional logic related to calendar icon click
  };

  const onToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const onAddEvent = (newEvent) => {
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
          <Events selectedDate={selectedDate} events={combinedEvents} />
          <AddEventButton onAddEvent={onAddEvent} />
        </div>
      </div>
    </div>
  );
}

export default App;
