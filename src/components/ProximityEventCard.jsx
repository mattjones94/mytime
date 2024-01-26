// ProximityEventCard.jsx
import React, { useState } from "react";
import "./ProximityEventCard.css";
import ViewModal from "./ViewModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { getColorScheme } from "../utilities/colorUtils";

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
        if (!data.category) {
          console.error(`Event at index ${index} has no category:`, data);
          // Provide a default category or skip rendering for events without a category
          return null;
        }

        const { backgroundColor, borderColor } = getColorScheme(data.category);

        return (
          <div
            className="proximity-card"
            key={index}
            style={{
              backgroundColor,
              borderColor,
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
