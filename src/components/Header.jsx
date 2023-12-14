// Header.js
import React, { useState, useRef, useEffect } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="header">
      <div className="header-logo">
        <p className="header-image">
          <FontAwesomeIcon icon={faClock} />
        </p>
        <h1>MyTime</h1>
      </div>

      <div className="header-buttons">
        <button className="search-button">
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

      {/* Add any other header content or buttons as needed */}
    </div>
  );
};

export default Header;
