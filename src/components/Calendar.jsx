import React, { useState, useEffect } from "react";
import "./Calendar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";


const Calendar = ({ selectedDate, onDayClick, eventsData }) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    // Highlight the selected date or today's date when the component mounts
    if (!selectedDate) {
      onDayClick(new Date());
    }
  }, [onDayClick, selectedDate]);

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

    // Fill in the preceding empty cells with days from the previous month
    const prevMonthDays = daysInMonth(date.getMonth() - 1, date.getFullYear());
    for (let i = startDay - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      days.push(
        <div
          key={`prev${i}`}
          className={`day faded-day`}
          onClick={() => handlePrevMonthDayClick(day)}
        >
          {day}
        </div>
      );
    }

    // Fill in the days of the current month
    for (let i = 1; i <= totalDays; i++) {
      const eventsOnDay = eventsData.filter(
        (event) =>
          event.date &&
          event.date.getFullYear() === date.getFullYear() &&
          event.date.getMonth() === date.getMonth() &&
          event.date.getDate() === i
      );

      const uniqueColors = [
        ...new Set(eventsOnDay.map((event) => event.color)),
      ];

      days.push(
        <div
          key={i + startDay}
          className={`day ${
            (selectedDate && selectedDate.getDate() === i) ||
            (selectedDate === null && new Date().getDate() === i)
              ? "selected"
              : ""
          }`}
          onClick={() => handleDayClick(i)}
        >
          {i}
          {uniqueColors.map((color, index) => (
            <div
              key={index}
              className="event-indicator"
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>
      );
    }

    // Fill in the remaining empty cells with days from the next month
    const nextMonthDays = 42 - startDay - totalDays;
    for (let i = 1; i <= nextMonthDays; i++) {
      days.push(
        <div
          key={`next${i}`}
          className={`day faded-day`}
          onClick={() => handleNextMonthDayClick(i)}
        >
          {i}
        </div>
      );
    }

    return days;
  };

  const handleDayClick = (day) => {
    const newSelectedDate = new Date(date.getFullYear(), date.getMonth(), day);
    onDayClick(newSelectedDate);
  };

  const handlePrevMonthDayClick = (day) => {
    // Navigate to the previous month when a faded day from the previous month is clicked
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, day));
  };

  const handleNextMonthDayClick = (day) => {
    // Navigate to the next month when a faded day from the next month is clicked
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, day));
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
          <button style={{ borderBottomLeftRadius: 10,borderTopLeftRadius: 10 }} className="month-buttons" onClick={handlePrevMonthClick}>
            {/* &lt; */}
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <h2>
            {new Date(date).toLocaleDateString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <button style={{ borderBottomRightRadius: 10,borderTopRightRadius: 10 }} className="month-buttons" onClick={handleNextMonthClick}>
            {/* &gt; */}
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
        <hr></hr>
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
