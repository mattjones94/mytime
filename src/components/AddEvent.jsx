import React, { useState } from "react";
import "./AddEvent.css";
import { addEvent } from "../data/dataService";

const AddEventButton = ({ onAddEvent }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState(""); // Add type state
  const [color, setColor] = useState(""); // Add color state

  const handleAddEvent = () => {
    // Validate and add the event
    if (title && description && date && time && category) {
      // Parse the date and time strings
      const [year, month, day] = date.split("-").map(Number);
      const [hour, minute] = time.split(":").map(Number);

      // Create a new Date object in UTC to avoid time zone issues
      const newEventDate = new Date(
        Date.UTC(year, month - 1, day + 1, hour, minute)
      );

      const newEvent = {
        title,
        description,
        date: newEventDate,
        time,
        category, // Include type in the new event
      };

      // Call the addEvent function to store the event in local storage
      addEvent(newEvent);

      // Call the onAddEvent prop if it's defined to update the state in the parent component
      if (onAddEvent) {
        onAddEvent(newEvent);
      }

      closeAndResetModal();
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
            <h2 className="add-event-header">Add Event</h2>
            <label>Title:</label>
            <input
              className="data-input-field"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label>Description:</label>
            <textarea
              className="data-input-field"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label>Date:</label>
            <input
              className="data-input-field"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <label>Time:</label>
            <input
              className="data-input-field"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <label>Type:</label>
            <select
              className="data-input-field"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Type</option>
              <option value="Personal">Personal</option>
              <option value="Medical">Medical</option>
              <option value="Social">Social</option>
              <option value="Financial">Financial</option>
            </select>

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
