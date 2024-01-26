// Events.jsx
import React from "react";
import "./Events.css";
import EventCard from "./EventCard";

const Events = ({ selectedDate, events, onUpdate, onDelete }) => {
  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);

    return (
      eventDate &&
      selectedDate &&
      selectedDate instanceof Date &&
      eventDate.getFullYear() === selectedDate.getFullYear() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getDate() === selectedDate.getDate()
    );
  });

  const categories = [...new Set(events.map((event) => event.category))];

  const weekday = selectedDate
    ? new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(selectedDate)
    : "";
  const monthAndDay = selectedDate
    ? selectedDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "";
  const handleUpdate = (oldEvent, updatedEvent) => {
    onUpdate(oldEvent, updatedEvent);
  };

  const handleDelete = (event) => {
    onDelete(event);
  };

  return (
    <div className="events-list">
      <h2 className="events-list-title">My Events</h2>
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
              <EventCard
                event={event}
                categories={categories}
                onUpdate={onUpdate} // Pass the onUpdate prop
                onDelete={handleDelete}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Events;
