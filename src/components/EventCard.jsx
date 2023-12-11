// EventCard.jsx
import React, { useState } from "react";
import "./EventCard.css";
import EditModal from "./EditModal"; // Import your EditModal component
import DeleteModal from "./DeleteModal"; // Import your DeleteModal component
import ViewModal from "./ViewModal"; // Import your ViewModal component

const EventCard = ({ event }) => {
  const formatDate = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

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

  const opacity = 0.8;
  const [isMenuVisible, setMenuVisibility] = useState(false);
  const [isEditModalVisible, setEditModalVisibility] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisibility] = useState(false);
  const [isViewModalVisible, setViewModalVisibility] = useState(false);

  const toggleMenu = () => {
    setMenuVisibility(!isMenuVisible);
  };

  const openEditModal = () => {
    setMenuVisibility(false); // Close the menu when opening the modal
    setEditModalVisibility(true);
  };

  const closeEditModal = () => {
    setEditModalVisibility(false);
  };

  const openDeleteModal = () => {
    setMenuVisibility(false); // Close the menu when opening the modal
    setDeleteModalVisibility(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalVisibility(false);
  };

  const confirmDelete = () => {
    // Perform the deletion logic here
    // For now, just close the modal
    closeDeleteModal();
  };

  const openViewModal = () => {
    setMenuVisibility(false); // Close the menu when opening the modal
    setViewModalVisibility(true);
  };

  const closeViewModal = () => {
    setViewModalVisibility(false);
  };

  return (
    <div
      className="event-card"
      style={{
        borderColor: newShade(hexColor, -25),
        backgroundColor: `${newShade(hexColor, 50)}${Math.round(
          opacity * 255
        ).toString(32)}`,
        color: "black",
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
            <div className="menu-options-item" onClick={openEditModal}>
              Edit
            </div>
            <div className="menu-options-item" onClick={openViewModal}>
              View
            </div>
            <div
              className="menu-options-item"
              style={{ color: "red" }}
              onClick={openDeleteModal}
            >
              Delete
            </div>
          </div>
        )}
      </div>

      {isEditModalVisible && (
        <EditModal event={event} onClose={closeEditModal} />
      )}

      {isDeleteModalVisible && (
        <DeleteModal
          event={event}
          onDelete={confirmDelete}
          onClose={closeDeleteModal}
        />
      )}

      {isViewModalVisible && (
        <ViewModal
          event={event}
          onEdit={openEditModal}
          onDelete={openDeleteModal}
          onClose={closeViewModal}
        />
      )}
    </div>
  );
};

export default EventCard;
