// App.js
import React, { useState } from "react";
import "./App.css";
import Calendar from "./components/Calendar";
import Events from "./components/Events";
import Header from "./components/Header";
import AddEventButton from "./components/AddEvent";
import eventsData from "./data/eventsData";
import ProximityEventCard from "./components/ProximityEventCard";

function App() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDayClick = (newSelectedDate) => {
    setSelectedDate(newSelectedDate);
  };

  return (
    <div className="App">
      <Header eventsData={eventsData} />
      <div className="master-container">
        <div className="proximity-calendar-container">
          <p className="upcoming-events-title">Upcoming Events:</p>
          <ProximityEventCard eventsData={eventsData} />
          <Calendar
            selectedDate={selectedDate}
            onDayClick={handleDayClick} // Pass the handleDayClick callback
            eventsData={eventsData}
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
