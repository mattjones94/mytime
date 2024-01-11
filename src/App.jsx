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

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false); // New state for dark mode

  const handleDayClick = (newSelectedDate) => {
    setSelectedDate(newSelectedDate);
  };

  const handleCalendarIconClick = (date) => {
    setSelectedDate(date);
    const month = date.getMonth();
    const year = date.getFullYear();
  };

  const onToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`App ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <Header
        eventsData={eventsData}
        onCalendarIconClick={handleCalendarIconClick}
        onToggleDarkMode={onToggleDarkMode}
        isDarkMode={isDarkMode} // Pass the dark mode state
      />
      <div className="master-container">
        <div className="proximity-calendar-container">
          <p className="upcoming-events-title">Upcoming Events:</p>
          <ProximityEventCard eventsData={eventsData} />
          <Calendar
            selectedDate={selectedDate}
            onDayClick={handleDayClick}
            eventsData={eventsData}
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
          {/*Moon color- 1E3050 
            Sun color - fcff5c
            Light mode background color - FFF9E5,
            Dark mode background color -  2E3060
            
          */}
        </div>
        <div className="master-events-container">
          <Events selectedDate={selectedDate} eventsData={eventsData} />
          <AddEventButton />
        </div>
      </div>
    </div>
  );
}

export default App;
