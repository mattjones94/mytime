import React, { useState } from "react";
import "./Calendar.css";

const Calendar = ({
  selectedDate,
  onDayClick, // Rename to onDayClick
  eventsData,
}) => {
  const [date, setDate] = useState(new Date());

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

    for (let i = 1; i <= totalDays; i++) {
      const eventsOnDay = eventsData.filter(
        (event) =>
          event.date &&
          event.date.getFullYear() === date.getFullYear() &&
          event.date.getMonth() === date.getMonth() &&
          event.date.getDate() === i
      );

      days.push(
        <div
          key={i + startDay}
          className={`day ${
            selectedDate && selectedDate.getDate() === i ? "selected" : ""
          }`}
          onClick={() => handleDayClick(i)}
        >
          {i}
          {eventsOnDay.length > 0 && <div className="event-indicator"></div>}
        </div>
      );
    }

    return days;
  };

  const handleDayClick = (day) => {
    const newSelectedDate = new Date(date.getFullYear(), date.getMonth(), day);
    onDayClick(newSelectedDate); // Call the callback with the new selected date
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
          <div className="weekday">Sun</div>
          <div className="weekday">Mon</div>
          <div className="weekday">Tue</div>
          <div className="weekday">Wed</div>
          <div className="weekday">Thu</div>
          <div className="weekday">Fri</div>
          <div className="weekday">Sat</div>
          {renderDays()}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
