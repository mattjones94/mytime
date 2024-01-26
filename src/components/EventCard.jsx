// EventCard.jsx
import React, { useState } from "react";
import "./EventCard.css";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import ViewModal from "./ViewModal";
import { getColorScheme } from "../utilities/colorUtils";
import { updateEvent } from "../data/dataService";

const EventCard = ({ event, categories, onUpdate, onDelete }) => {
  const formatDate = (date) => {
    if (date instanceof Date) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return "";
  };

  const { backgroundColor, borderColor, newShade } = getColorScheme(
    event.category
  );

  const opacity = 0.8;
  const [isMenuVisible, setMenuVisibility] = useState(false);
  const [isEditModalVisible, setEditModalVisibility] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisibility] = useState(false);
  const [isViewModalVisible, setViewModalVisibility] = useState(false);

  const toggleMenu = () => {
    setMenuVisibility(!isMenuVisible);
  };

  const openEditModal = () => {
    setMenuVisibility(false);
    setEditModalVisibility(true);
  };

  const closeEditModal = () => {
    setEditModalVisibility(false);
  };

  const openDeleteModal = () => {
    setMenuVisibility(false);
    setDeleteModalVisibility(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalVisibility(false);
  };

  const confirmDelete = () => {
    closeDeleteModal();
    onDelete(event); // Pass the event to be deleted
  };

  const openViewModal = () => {
    setMenuVisibility(false);
    setViewModalVisibility(true);
  };

  const closeViewModal = () => {
    setViewModalVisibility(false);
  };
  const handleUpdate = (updatedEvent) => {
    onUpdate(updatedEvent); // Pass both the old and updated events
    updateEvent(updatedEvent); // Update the event in local storage
    closeEditModal();
  };

  return (
    <div
      className="event-card"
      style={{
        borderColor,
        backgroundColor: `${backgroundColor}${Math.round(
          opacity * 255
        ).toString(32)}`,
        color: "black",
      }}
    >
      <div className="event-details">
        <div className="event-time" style={{ color: borderColor }}>
          {formatDate(event.date)}
        </div>
        <div
          className="event-name"
          style={{ color: newShade(borderColor, -25) }}
        >
          {event.title}
        </div>
        <div className="event-type" style={{ backgroundColor, color: "white" }}>
          {event.category}
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
        <EditModal
          event={event}
          onClose={closeEditModal}
          onUpdate={handleUpdate}
          categories={categories}
        />
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
