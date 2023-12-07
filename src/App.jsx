// App.js
import React, { useState } from "react";
import "./App.css";
import Calendar from "./components/Calendar";
import Events from "./components/Events";
import Header from "./components/Header";
import AddEventButton from "./components/AddEvent";
import eventsData from "./data/eventsData";

function App() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDayClick = (newSelectedDate) => {
    setSelectedDate(newSelectedDate);
  };

  return (
    <div className="App">
      <Header />
      <div className="master-container">
        <Calendar
          selectedDate={selectedDate}
          onDayClick={handleDayClick} // Pass the handleDayClick callback
          eventsData={eventsData}
        />
        <Events selectedDate={selectedDate} eventsData={eventsData} />
        <AddEventButton />
      </div>
    </div>
  );
}

export default App;
