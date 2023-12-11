// DeleteModal.jsx
import React, { useState } from "react";
import "./DeleteModal.css";

const DeleteModal = ({ event, onDelete, onClose }) => {
  const [isConfirmationModalVisible, setConfirmationModalVisibility] =
    useState(false);

  const handleDelete = () => {
    // Show the final confirmation modal
    setConfirmationModalVisibility(true);
  };

  const handleFinalDelete = () => {
    // Handle the final deletion (you can perform the actual deletion here)
    onDelete();

    // Close both modals
    onClose();
  };

  const handleClose = () => {
    // Close the current modal
    onClose();
  };

  return (
    <>
      {/* First Modal: Delete Confirmation */}
      <div className="delete-modal-overlay">
        <div className="delete-modal">
          <h2>Delete Event</h2>
          <p>Are you sure you want to delete this event?</p>
          <div className="delete-modal-buttons">
            <button onClick={handleDelete}>Yes</button>
            <button onClick={onClose}>No</button>
          </div>
        </div>
      </div>

      {/* Second Modal: Final Confirmation */}
      {isConfirmationModalVisible && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">
            <h2>Confirm Deletion</h2>
            <p>Are you really, really sure?</p>
            <div className="delete-modal-buttons">
              <button onClick={handleFinalDelete}>Yes</button>
              <button onClick={handleClose}>No</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteModal;
