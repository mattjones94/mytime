import React, { useState } from "react";
import "./AddEvent.css";

const AddEventButton = ({ onAddEvent }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleAddEvent = () => {
    // Validate and add the event
    if (title && description && date && time) {
      const newEvent = {
        title,
        description,
        date: new Date(date),
        time,
      };
      onAddEvent(newEvent);
      closeAndResetModal();
    } else {
      // Handle validation or show an error message
      console.error("All fields must be filled!");
    }
  };

  const closeAndResetModal = () => {
    setModalIsOpen(false);
    // Reset state values for the next time the modal is opened
    setTitle("");
    setDescription("");
    setDate("");
    setTime("");
  };

  return (
    <div>
      <button className="add-event-button" onClick={() => setModalIsOpen(true)}>
        <span>+</span>
      </button>

      {modalIsOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add Event</h2>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label>Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <label>Time:</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />

            <div className="modal-buttons">
              <button onClick={handleAddEvent}>Add Event</button>
              <button onClick={closeAndResetModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddEventButton;
