import React from "react";
import "./ProximityEventCard.css";

const ProximityEventCard = ({ eventsData }) => {
  // Sort eventsData based on the time
  const sortedEventsData = [...eventsData].sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );

  return (
    <div className="proximity-event-card-container">
      {sortedEventsData.map((data, index) => (
        <div
          className="proximity-card"
          key={index}
          style={{ backgroundColor: data.color }}
        >
          <div className="card-body">
            <p className="time">
              {data.date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <h3 className="title">{data.title}</h3>
          </div>
          <div className="card-footer">
            <p className="date">{data.date.toLocaleDateString()}</p>
            <button className="view-button">View</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProximityEventCard;
