// Search.js
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import "./Search.css";
import ViewModal from "./ViewModal"; // Import your ViewModal component
import EditModal from "./EditModal"; // Import your EditModal component
import DeleteModal from "./DeleteModal"; // Import your DeleteModal component

const Search = ({ eventsData, onClose, onCalendarIconClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filtercategory, setFiltercategory] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    // Filter events based on the search term and selected category
    const filtered = eventsData.filter(
      (event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filtercategory ? event.category === filtercategory : true)
    );
    setFilteredEvents(filtered);
  }, [searchTerm, filtercategory, eventsData]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlecategoryFilter = (category) => {
    // Toggle active state if the same category is clicked again
    setFiltercategory((prevFilter) =>
      prevFilter === category ? null : category
    );
  };

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    setViewModalOpen(true);
  };

  const handleEditClick = () => {
    setViewModalOpen(false);
    setEditModalOpen(true);
  };

  const handleDeleteClick = () => {
    setViewModalOpen(false);
    setDeleteModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setSelectedEvent(null);
    setViewModalOpen(false);
  };

  const handleEditSave = (editedEvent) => {
    // Handle saving the edited event
    console.log("Saving edited event:", editedEvent);

    // Close the modal
    setEditModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    // Handle confirming the delete
    console.log("Deleting event:", selectedEvent);

    // Close the modal
    setDeleteModalOpen(false);
  };

  const handleClickCalendarIcon = (event) => {
    const eventDate = event.date;
    onCalendarIconClick(eventDate);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <div className="search-modal-overlay" onClick={handleCloseModal}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-bar">
          <input
            category="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>

        <div className="category-filters">
          {Array.from(new Set(eventsData.map((event) => event.category))).map(
            (category) => (
              <button
                key={category}
                onClick={() => handlecategoryFilter(category)}
                className={filtercategory === category ? "active" : ""}
              >
                {category}
              </button>
            )
          )}
        </div>

        <div
          className={`search-results ${
            (searchTerm !== "" && filteredEvents.length > 0) || filtercategory
              ? "visible"
              : ""
          }`}
        >
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="search-result-item"
              onClick={() => handleViewDetails(event)}
            >
              <FontAwesomeIcon
                icon={faCalendar}
                className="calendar-icon"
                onClick={() => handleClickCalendarIcon(event)}
              />
              <p className="search-result-item-title">{event.title}</p>
            </div>
          ))}
        </div>

        {selectedEvent && (
          <ViewModal
            event={selectedEvent}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
            onClose={handleCloseViewModal}
          />
        )}

        {isEditModalOpen && (
          <EditModal
            event={selectedEvent}
            onSave={handleEditSave}
            onClose={() => setEditModalOpen(false)}
          />
        )}

        {isDeleteModalOpen && (
          <DeleteModal
            event={selectedEvent}
            onDelete={handleDeleteConfirm}
            onClose={() => setDeleteModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Search;
