// Events.js
import React from "react";
import "./Events.css";

const Events = ({ selectedDate, eventsData }) => {
  console.log("Selected Date:", selectedDate);
  console.log("Events Data:", eventsData);

  const filteredEvents = eventsData.filter((event) => {
    console.log("Event Date:", event.date);

    // Add a check for selectedDate to prevent null error
    return (
      event.date &&
      selectedDate &&
      selectedDate instanceof Date &&
      event.date.getFullYear() === selectedDate.getFullYear() &&
      event.date.getMonth() === selectedDate.getMonth() &&
      event.date.getDate() === selectedDate.getDate()
    );
  });

  console.log("Filtered Events:", filteredEvents);

  return (
    <div className="events-list">
      <h2>My Events</h2>
      <ul>
        {filteredEvents.map((event, index) => (
          <li key={index}>{event.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Events;
