import React, { useState } from "react";
import "./Calendar_professor.css";

const Calendar = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDayClick = (day) => {
    const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(selected);
    console.log(`Selected Date: ${selected.toDateString()}`);
  };

  const handleMarkAttendance = (status) => {
    if (selectedDate) {
      alert(`Marked student as "${status}" on ${selectedDate.toDateString()}`);
    } else {
      alert("Please select a date first.");
    }
  };

  const handleAddGrade = () => {
    if (selectedDate) {
      const grade = prompt("Enter grade for the selected date:");
      if (grade) {
        alert(`Assigned grade "${grade}" on ${selectedDate.toDateString()}`);
      }
    } else {
      alert("Please select a date first.");
    }
  };

  const renderCalendarDays = () => {
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const daysInMonth = endOfMonth.getDate();
    const firstDayIndex = startOfMonth.getDay();

    const calendarDays = [];

    // Fill empty days before the start of the month
    for (let i = 0; i < firstDayIndex; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }

    // Fill actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        today.getDate() === day &&
        today.getMonth() === currentDate.getMonth() &&
        today.getFullYear() === currentDate.getFullYear();
      const isSelected =
        selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === currentDate.getMonth() &&
        selectedDate.getFullYear() === currentDate.getFullYear();

      calendarDays.push(
        <div
          key={`day-${day}`}
          className={`calendar-day ${isToday ? "today" : ""} ${isSelected ? "selected" : ""}`}
          onClick={() => handleDayClick(day)}
        >
          {day}
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="nav-button" onClick={handlePrevMonth}>
          &lt;
        </button>
        <h2>
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h2>
        <button className="nav-button" onClick={handleNextMonth}>
          &gt;
        </button>
      </div>
      <div className="calendar-grid">
        <div className="day-label">Sun</div>
        <div className="day-label">Mon</div>
        <div className="day-label">Tue</div>
        <div className="day-label">Wed</div>
        <div className="day-label">Thu</div>
        <div className="day-label">Fri</div>
        <div className="day-label">Sat</div>
        {renderCalendarDays()}
      </div>
      <div className="calendar-actions">
        <button
          className="attendance-button present-button"
          onClick={() => handleMarkAttendance("Present")}
        >
          Mark Present
        </button>
        <button
          className="attendance-button absent-button"
          onClick={() => handleMarkAttendance("Absent")}
        >
          Mark Absent
        </button>
        <button className="attendance-button grade-button" onClick={handleAddGrade}>
          Add Grade
        </button>
      </div>
    </div>
  );
};

export default Calendar;
