import React, { useState } from "react";
import "./Calendar.css";

const Calendar = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());

  // Example attendance data (Replace with data from backend once available)
  const attendanceData = {
    "2024-12-01": { status: "Present" },
    "2024-12-02": { status: "Absent" },
    "2024-12-05": { grade: "A" },
    "2024-12-10": { grade: "B" },
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
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
      const dateKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const attendanceInfo = attendanceData[dateKey];
      const isToday =
        today.getDate() === day &&
        today.getMonth() === currentDate.getMonth() &&
        today.getFullYear() === currentDate.getFullYear();

      calendarDays.push(
        <div
          key={`day-${day}`}
          className={`calendar-day ${isToday ? "today" : ""} ${
            attendanceInfo?.status === "Present"
              ? "present"
              : attendanceInfo?.status === "Absent"
              ? "absent"
              : attendanceInfo?.grade
              ? "grade"
              : ""
          }`}
          title={
            attendanceInfo
              ? attendanceInfo.status || `Grade: ${attendanceInfo.grade}`
              : "No Data"
          }
        >
          {day}
          {attendanceInfo?.grade && <span className="grade-badge">{attendanceInfo.grade}</span>}
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <div className="student-calendar-container">
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
    </div>
  );
};

export default Calendar;
