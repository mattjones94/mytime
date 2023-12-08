// EventCard.jsx
import React, { useState } from "react";
import "./EventCard.css";

const EventCard = ({ event }) => {
  const formatDate = (date) => {
    // Format date as needed (e.g., HH:mm AM/PM)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const colorNameToHex = (colorName) => {
    const colorMap = {
      orange: "#ffa500",
      blue: "#0000ff",
      purple: "#800080",
      yellow: "#ffff00",
      green: "#00ff00",
      // Add more colors as needed
    };

    // Convert colorName to lowercase for case-insensitive matching
    const lowerCaseColorName = colorName.toLowerCase();

    // Check if the colorName is in the colorMap, otherwise return a default color
    return colorMap[lowerCaseColorName] || "#000000";
  };

  const hexColor = colorNameToHex(event.color);

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

  const opacity = 0.8; // Set the desired opacity value (between 0 and 1)

  // State to manage the visibility of the kebab menu
  const [isMenuVisible, setMenuVisibility] = useState(false);

  const toggleMenu = () => {
    setMenuVisibility(!isMenuVisible);
  };

  return (
    <div
      className="event-card"
      style={{
        borderColor: newShade(hexColor, -25),
        backgroundColor: `${newShade(hexColor, 50)}${Math.round(
          opacity * 255
        ).toString(32)}`, // Adjust opacity
        color: "black", // Solid color for text
      }}
    >
      <div className="event-details">
        <div className="event-time" style={{ color: newShade(hexColor, -100) }}>
          {formatDate(event.date)}
        </div>
        <div className="event-name" style={{ color: newShade(hexColor, -25) }}>
          {event.title}
        </div>
        <div
          className="event-type"
          style={{ backgroundColor: hexColor, color: "white" }}
        >
          {event.type}
        </div>
      </div>
      <div className="kebab-menu" onClick={toggleMenu}>
        &#8942;
        {isMenuVisible && (
          <div className="menu-options">
            <div className="menu-options-item">Edit</div>
            <div className="menu-options-item">View</div>
            <div className="menu-options-item" style={{ color: "red" }}>
              Delete
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
