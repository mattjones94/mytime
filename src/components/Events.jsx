// Events.jsx
import React from "react";
import "./Events.css";
import EventCard from "./EventCard";

const Events = ({ selectedDate, eventsData }) => {
  const filteredEvents = eventsData.filter(
    (event) =>
      event.date &&
      selectedDate &&
      selectedDate instanceof Date &&
      event.date.getFullYear() === selectedDate.getFullYear() &&
      event.date.getMonth() === selectedDate.getMonth() &&
      event.date.getDate() === selectedDate.getDate()
  );

  return (
    <div className="events-list">
      <h2>My Events</h2>
      {filteredEvents.length === 0 ? (
        <p className="default-events-list">No events for the selected date</p>
      ) : (
        <ul>
          {filteredEvents.map((event, index) => (
            <li key={index}>
              <EventCard event={event} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Events;
