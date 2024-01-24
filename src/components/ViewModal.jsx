// ViewModal.jsx
import React from "react";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import "./ViewModal.css";

const ViewModal = ({ event, onEdit, onDelete, onClose }) => {
  return (
    <div className="view-modal-overlay">
      <div className="view-modal">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2 className="view-modal-title">{event.title}</h2>
        <p>Type: {event.category}</p>
        <p>Description: {event.description}</p>
        <p>
          Date:{" "}
          {event.date.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </p>

        <div className="view-modal-buttons">
          <button onClick={() => onEdit(event)}>Edit</button>
          <button onClick={() => onDelete(event)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
