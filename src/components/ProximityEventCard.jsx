import React, { useState } from "react";
import "./ProximityEventCard.css";
import ViewModal from "./ViewModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

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
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleViewClick = (event) => {
    setSelectedEvent(event);
    setViewModalOpen(true);
  };

  const handleEditClick = (event) => {
    setSelectedEvent(event);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (event) => {
    setSelectedEvent(event);
    setDeleteModalOpen(true);
  };

  const handleCloseModals = () => {
    setViewModalOpen(false);
    setEditModalOpen(false);
    setDeleteModalOpen(false);
  };

  const handleEditSave = (editedEvent) => {
    // Handle saving the edited event
    console.log("Saving edited event:", editedEvent);

    // Close the modal
    handleCloseModals();
  };

  const handleDeleteConfirm = () => {
    // Handle confirming the delete
    console.log("Deleting event:", selectedEvent);

    // Close the modal
    handleCloseModals();
  };

  const sortedEventsData = [...eventsData].sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );

  return (
    <div className="proximity-event-card-container">
      {sortedEventsData.map((data, index) => {
        const baseColor = colorNameToHex(data.color);
        const modifiedColor = newShade(baseColor, 40);

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
              <button
                className="view-button"
                onClick={() => handleViewClick(data)}
              >
                View
              </button>
            </div>
          </div>
        );
      })}

      {isViewModalOpen && (
        <ViewModal
          event={selectedEvent}
          onEdit={() => handleEditClick(selectedEvent)}
          onDelete={() => handleDeleteClick(selectedEvent)}
          onClose={handleCloseModals}
        />
      )}

      {isEditModalOpen && (
        <EditModal
          event={selectedEvent}
          onSave={handleEditSave}
          onClose={handleCloseModals}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          event={selectedEvent}
          onDelete={handleDeleteConfirm}
          onClose={handleCloseModals}
        />
      )}
    </div>
  );
};

export default ProximityEventCard;
