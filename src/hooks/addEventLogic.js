// addEventLogic.js
import React, { useState } from "react";
import AddEventModal from "../components/AddEventModal";

const AddEventLogic = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddEventClick = () => {
    // Implement the logic for adding an event
    setModalOpen(true);
  };

  return (
    <div>
      <button onClick={handleAddEventClick}>Open Modal</button>
      {modalOpen && <AddEventModal setOpenModal={setModalOpen} />}
    </div>
  );
};

export default AddEventLogic;
