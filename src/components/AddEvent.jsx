import React from "react";
import "./AddEvent.css";

const AddEventButton = ({ onClick }) => {
  return (
    <button className="add-event-button" onClick={onClick}>
      <span>+</span>
    </button>
  );
};

export default AddEventButton;
