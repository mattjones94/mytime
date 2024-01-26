// EditModal.jsx
import React, { useState } from "react";
import "./EditModal.css";
import { updateEvent } from "../data/dataService";

const EditModal = ({ event, onClose, onUpdate, categories }) => {
  const [editedEvent, setEditedEvent] = useState({
    title: event.title,
    category: event.category || (categories.length > 0 ? categories[0] : ""),
    date: event.date.toISOString().slice(0, 10),
    time: event.date.toISOString().slice(11, 16),
    description: event.description || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleUpdate = (oldEvent, updatedEvent) => {
    console.log("oldEvent:", oldEvent);
    console.log("updatedEvent:", updatedEvent);

    onUpdate(updatedEvent); // Make sure this line is present
    updateEvent(updatedEvent); // Update the event in local storage
    onClose();
  };

  const handleSaveChanges = () => {
    // Check if event is defined and has an id property
    if (!event || !event.id) {
      console.error("Event or event.id is undefined.");
      return;
    }

    const updatedEvent = {
      id: event.id,
      title: editedEvent.title,
      category: editedEvent.category,
      date: new Date(editedEvent.date + "T" + editedEvent.time),
      description: editedEvent.description,
    };

    handleUpdate(event, updatedEvent);
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
            <option value={editedEvent.category}>{editedEvent.category}</option>
            {categories
              .filter((category) => category !== editedEvent.category)
              .map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
          </select>
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={editedEvent.date}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Time:
          <input
            type="time"
            name="time"
            value={editedEvent.time}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={editedEvent.description}
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
