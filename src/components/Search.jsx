// Search.js
import React, { useState, useEffect } from "react";
import "./Search.css";

const Search = ({ eventsData, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    // Filter events based on the search term
    const filtered = eventsData.filter((event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [searchTerm, eventsData]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search-modal">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button onClick={onClose}>Close</button>
      </div>

      <div className="search-results">
        {filteredEvents.map((event) => (
          <div key={event.id} className="search-result-item">
            <p>{event.title}</p>
            {/* Add more event details if needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
