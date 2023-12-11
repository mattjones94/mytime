// EditModal.jsx
import React, { useState } from "react";
import "./EditModal.css";

const EditModal = ({ event, onClose }) => {
  const [editedEvent, setEditedEvent] = useState({
    title: event.title,
    type: event.type,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    // You can handle saving changes to the backend or update the state as needed
    console.log("Saving changes:", editedEvent);

    // Close the modal
    onClose();
  };

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal">
        <h2>Edit Event</h2>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={editedEvent.title}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Type:
          <input
            type="text"
            name="type"
            value={editedEvent.type}
            onChange={handleInputChange}
          />
        </label>
        <div className="edit-modal-buttons">
          <button onClick={handleSaveChanges}>Save Changes</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
