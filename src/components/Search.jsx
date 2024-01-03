// Search.js
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import "./Search.css";

const Search = ({ eventsData, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filterType, setFilterType] = useState(null);

  useEffect(() => {
    // Filter events based on the search term and selected type
    const filtered = eventsData.filter(
      (event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterType ? event.type === filterType : true)
    );
    setFilteredEvents(filtered);
  }, [searchTerm, filterType, eventsData]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTypeFilter = (type) => {
    setFilterType(type);
  };

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <div className="search-modal-overlay" onClick={handleCloseModal}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>

        <div className="type-filters">
          {Array.from(new Set(eventsData.map((event) => event.type))).map(
            (type) => (
              <button
                key={type}
                onClick={() => handleTypeFilter(type)}
                className={filterType === type ? "active" : ""}
              >
                {type}
              </button>
            )
          )}
        </div>

        <div className="search-results">
          {filteredEvents.map((event) => (
            <div key={event.id} className="search-result-item">
              <FontAwesomeIcon icon={faCalendar} className="calendar-icon" />
              <p>{event.title}</p>
              {/* <div className="separator"></div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
