// Header.js
import React, { useState, useRef } from "react";
import "./Header.css";
import MyTime from "../assets/MyTime.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
import Search from "./Search"; // Import the Search component

const Header = ({ eventsData }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleSearchModal = () => {
    setSearchModalOpen(!isSearchModalOpen);
  };

  return (
    <div className="header">
      <div className="header-logo">
        <p className="header-image">
          <img className="header-image-picture" src={MyTime} alt="MyTimeLogo" />
        </p>
        <h1>MyTime</h1>
      </div>

      <div className="header-buttons">
        <button className="search-button" onClick={toggleSearchModal}>
          <FontAwesomeIcon icon={faSearch} />
        </button>

        <div className="user-dropdown" ref={dropdownRef}>
          <button className="user-button" onClick={toggleDropdown}>
            <FontAwesomeIcon icon={faUserCircle} />
          </button>

          {isDropdownOpen && (
            <div className="dropdown-menu">
              <p className="menu-item">Settings</p>
              <p className="menu-item logout">Logout</p>
            </div>
          )}
        </div>
      </div>

      {isSearchModalOpen && (
        <Search eventsData={eventsData} onClose={toggleSearchModal} />
      )}

      {/* Add any other header content or buttons as needed */}
    </div>
  );
};

export default Header;
