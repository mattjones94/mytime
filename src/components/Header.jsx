// Header.js
import React, { useState, useRef } from "react";
import "./Header.css";
import MyTime from "../assets/MyTime.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faSearch,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import Search from "./Search";
import SettingsModal from "./SettingsModal";

const Header = ({
  eventsData,
  onCalendarIconClick,
  onToggleDarkMode,
  isDarkMode,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleSearchModal = () => {
    setSearchModalOpen(!isSearchModalOpen);
    setDropdownOpen(false);
  };

  const toggleSettingsModal = () => {
    setSettingsModalOpen(!isSettingsModalOpen);
    setDropdownOpen(false);
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
        <div>
          <button className="search-button" onClick={toggleSearchModal}>
            <FontAwesomeIcon icon={faSearch} />
          </button>

          {isSearchModalOpen && eventsData && (
            <Search
              eventsData={eventsData}
              onClose={toggleSearchModal}
              onCalendarIconClick={onCalendarIconClick}
            />
          )}
        </div>

        <div className="user-dropdown" ref={dropdownRef}>
          <button className="user-button" onClick={toggleDropdown}>
            <FontAwesomeIcon icon={faUserCircle} />
          </button>

          {isDropdownOpen && (
            <div className="dropdown-menu">
              <p className="menu-item" onClick={toggleSettingsModal}>
                <FontAwesomeIcon icon={faCog} />
                Settings
              </p>
              <p className="menu-item logout">Logout</p>
            </div>
          )}
        </div>
      </div>

      {isSettingsModalOpen && (
        <SettingsModal
          onClose={toggleSettingsModal}
          onToggleDarkMode={onToggleDarkMode}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
};

export default Header;
