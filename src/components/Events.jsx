import React from "react";
import "./Events.css";

const Events = () => {
  const events = [
    "Event 1",
    "Event 2",
    "Event 3",
    // Add more events as needed
  ];
  return (
    <div className="events-list">
      <h2>Events List</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>{event}</li>
        ))}
      </ul>
    </div>
  );
};

export default Events;
