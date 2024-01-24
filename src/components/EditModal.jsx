// EditModal.jsx
import React, { useState } from "react";
import "./EditModal.css";

const EditModal = ({ event, onClose, categories }) => {
  const [editedEvent, setEditedEvent] = useState({
    title: event.title,
    category: event.category || (categories.length > 0 ? categories[0] : ""),
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
        <h2 className="edit-modal-event-header">Edit Event</h2>
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
          Category:
          <select
            name="category"
            value={editedEvent.category}
            onChange={handleInputChange}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
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
