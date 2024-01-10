// SettingsModal.js
import React, { useState, useEffect } from "react";
import "./SettingsModal.css";

const SettingsModal = ({ onClose, onToggleDarkMode, isDarkMode }) => {
  const [darkMode, setDarkMode] = useState(isDarkMode);

  useEffect(() => {
    setDarkMode(isDarkMode);
  }, [isDarkMode]);

  const handleToggle = () => {
    setDarkMode(!darkMode);
    onToggleDarkMode(!darkMode);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="settings-header">Settings</h2>

        <div className="settings-container">
          <div className="setting-row">
            <span className="setting-title">Dark Mode</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={handleToggle}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SettingsModal;
