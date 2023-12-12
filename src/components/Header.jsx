// Header.js
import React from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <div className="header">
      <div className="header-logo">
        <p className="header-image">
          <FontAwesomeIcon icon={faClock} />
        </p>
        <h1>MyTime</h1>
      </div>
      <button className="user-button">
        <FontAwesomeIcon icon={faUserCircle} />
      </button>

      {/* Add any other header content or buttons as needed */}
    </div>
  );
};

export default Header;
