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

  // Get the weekday and month with day of the month
  const weekday = selectedDate
    ? new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(selectedDate)
    : "";
  const monthAndDay = selectedDate
    ? selectedDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <div className="events-list">
      <h2>My Events</h2>
      <div className="date-and-weekday">
        <h3 className="selected-date-weekday">{weekday}</h3>
        <h3 className="selected-date-date">{monthAndDay}</h3>
      </div>
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
