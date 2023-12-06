// Calendar.js
import React, { useState } from "react";
import "./Calendar.css";

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const startOfMonth = () => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderDays = () => {
    const totalDays = daysInMonth(date.getMonth(), date.getFullYear());
    const startDay = startOfMonth();

    const days = [];

    for (let i = 0; i < startDay; i++) {
      days.push(<div key={i}></div>);
    }

    for (let i = 1; i <= totalDays; i++) {
      days.push(
        <div
          key={i + startDay}
          className={`day ${selectedDate === i ? "selected" : ""}`}
          onClick={() => handleDayClick(i)}
        >
          {i}
        </div>
      );
    }

    return days;
  };

  const handleDayClick = (day) => {
    setSelectedDate(day);
    // You can perform any other action when a day is clicked
  };

  const handlePrevMonthClick = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1));
  };

  const handleNextMonthClick = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1));
  };

  return (
    <div className="calendar-container">
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={handlePrevMonthClick}>&lt;</button>
          <h2>
            {new Date(date).toLocaleDateString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <button onClick={handleNextMonthClick}>&gt;</button>
        </div>
        <div className="days">
          <div className="day">Sun</div>
          <div className="day">Mon</div>
          <div className="day">Tue</div>
          <div className="day">Wed</div>
          <div className="day">Thu</div>
          <div className="day">Fri</div>
          <div className="day">Sat</div>
          {renderDays()}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
