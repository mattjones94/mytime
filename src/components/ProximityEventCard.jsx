import React from "react";
import "./ProximityEventCard.css";

const colorNameToHex = (colorName) => {
  const colorMap = {
    orange: "#ffa500",
    blue: "#0000ff",
    purple: "#800080",
    yellow: "#ffff00",
    green: "#00ff00",
  };

  const lowerCaseColorName = colorName.toLowerCase();
  return colorMap[lowerCaseColorName] || "#000000";
};

const newShade = (hexColor, magnitude) => {
  hexColor = hexColor.replace(`#`, ``);
  if (hexColor.length === 6) {
    const decimalColor = parseInt(hexColor, 16);
    let r = (decimalColor >> 16) + magnitude;
    r > 255 && (r = 255);
    r < 0 && (r = 0);
    let g = (decimalColor & 0x0000ff) + magnitude;
    g > 255 && (g = 255);
    g < 0 && (g = 0);
    let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
    b > 255 && (b = 255);
    b < 0 && (b = 0);
    return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
  } else {
    return hexColor;
  }
};

const ProximityEventCard = ({ eventsData }) => {
  // Sort eventsData based on the time
  const sortedEventsData = [...eventsData].sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );

  return (
    <div className="proximity-event-card-container">
      {sortedEventsData.map((data, index) => {
        const baseColor = colorNameToHex(data.color);
        const modifiedColor = newShade(baseColor, 40); // You can adjust the magnitude as needed

        return (
          <div
            className="proximity-card"
            key={index}
            style={{
              backgroundColor: modifiedColor,
              borderColor: newShade(baseColor, -25),
            }}
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
        );
      })}
    </div>
  );
};

export default ProximityEventCard;
