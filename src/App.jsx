// App.js
import React, { useState } from "react";
import "./App.css";
import Calendar from "./components/Calendar";
import Events from "./components/Events";
import Header from "./components/Header";
import AddEventButton from "./components/AddEvent";
import eventsData from "./data/eventsData";
import ProximityEventCard from "./components/ProximityEventCard";
import Search from "./components/Search";

function App() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDayClick = (newSelectedDate) => {
    setSelectedDate(newSelectedDate);
  };

  const handleCalendarIconClick = (date) => {
    // Update the selected date state
    setSelectedDate(date);

    const month = date.getMonth();
    const year = date.getFullYear();
  };

  return (
    <div className="App">
      <Header
        eventsData={eventsData}
        onCalendarIconClick={handleCalendarIconClick}
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
