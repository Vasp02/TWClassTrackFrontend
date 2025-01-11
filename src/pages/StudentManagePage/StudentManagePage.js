import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./StudentManagePage.css";

const StudentManagePage = () => {
  const { cid, sid } = useParams();
  const [studentData, setStudentData] = useState(null);
  const [classroomData, setClassroomData] = useState(null);
  const [attendanceList, setAttendanceList] = useState([]);
  const [gradesList, setGradesList] = useState([]);
  const [newDate, setNewDate] = useState(null);
  const [newGrade, setNewGrade] = useState({ title: "", grade: "" });

  useEffect(() => {
    fetchStudentData();
    fetchClassroomData();
    fetchAttendanceData();
    fetchGradesData();
  }, [cid, sid]);

  const fetchStudentData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/students/id/${sid}`);
      setStudentData(response.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  const fetchClassroomData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/classrooms/${cid}`);
      setClassroomData(response.data);
    } catch (error) {
      console.error("Error fetching classroom data:", error);
    }
  };

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/attendance/${cid}/${sid}`
      );
      setAttendanceList(response.data);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  const fetchGradesData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/grades/${cid}/${sid}`
      );
      setGradesList(response.data);
    } catch (error) {
      console.error("Error fetching grades data:", error);
    }
  };

  const handleAddAttendance = () => {
    if (!newDate) return;
    const formattedDate = newDate.toISOString().split("T")[0];
    const newEntry = { date: formattedDate, status: "present" };

    setAttendanceList([...attendanceList, newEntry]); // Update UI
    setNewDate(null); // Clear the date picker

    axios
      .post(`http://localhost:8080/api/attendance/${cid}/${sid}`, newEntry)
      .catch((error) => {
        console.error("Error adding attendance:", error);
      });
  };

  const handleRemoveAttendance = (index) => {
    const entryToRemove = attendanceList[index];

    setAttendanceList(attendanceList.filter((_, i) => i !== index)); // Update UI

    axios
      .delete(
        `http://localhost:8080/api/attendance/${cid}/${sid}`,
        { data: { date: entryToRemove.date } }
      )
      .catch((error) => {
        console.error("Error removing attendance:", error);
      });
  };

  const handleAttendanceStatusChange = (index, status) => {
    const updatedList = [...attendanceList];
    updatedList[index].status = status;
    setAttendanceList(updatedList);

    axios
      .put(`http://localhost:8080/api/attendance/${cid}/${sid}`, updatedList[index])
      .catch((error) => {
        console.error("Error updating attendance status:", error);
      });
  };

  const handleAddGrade = () => {
    if (!newGrade.title || !newGrade.grade) return;

    const newEntry = { title: newGrade.title, grade: parseFloat(newGrade.grade) };

    setGradesList([...gradesList, newEntry]); // Update UI
    setNewGrade({ title: "", grade: "" }); // Clear inputs

    axios
      .post(`http://localhost:8080/api/grades/${cid}/${sid}`, newEntry)
      .catch((error) => {
        console.error("Error adding grade:", error);
      });
  };

  const handleRemoveGrade = (index) => {
    const entryToRemove = gradesList[index];

    setGradesList(gradesList.filter((_, i) => i !== index)); // Update UI

    axios
      .delete(
        `http://localhost:8080/api/grades/${cid}/${sid}`,
        { data: { title: entryToRemove.title } }
      )
      .catch((error) => {
        console.error("Error removing grade:", error);
      });
  };

  const handleGradeInputChange = (e) => {
    const value = e.target.value;

    // Validate input: allow only numbers and at most one dot
    if (/^\d*\.?\d*$/.test(value)) {
      setNewGrade({ ...newGrade, grade: value });
    }
  };

  if (!studentData || !classroomData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="student-manage-container">
      <div className="student-header">
        <h2>Manage Student</h2>
        <h3>
          Student: {studentData.firstName} {studentData.lastName}
        </h3>
        <p>Classroom: {classroomData.name}</p>
      </div>

      {/* Attendance Manager */}
      <div className="attendance-manager">
        <h3>Attendance</h3>
        <div className="attendance-header">
          <p>Attendance List</p>
          <button className="add-date-button" onClick={handleAddAttendance}>
            +
          </button>
          <DatePicker
            selected={newDate}
            onChange={(date) => setNewDate(date)}
            placeholderText="Select a date"
            className="date-picker"
          />
        </div>
        <ul className="attendance-list">
          {attendanceList.map((entry, index) => (
            <li key={index} className="attendance-item">
              <span>{entry.date}</span>
              <select
                value={entry.status}
                onChange={(e) => handleAttendanceStatusChange(index, e.target.value)}
                className="status-select"
              >
                <option value="present">Present</option>
                <option value="absent">Absent</option>
              </select>
              <button
                className="remove-button"
                onClick={() => handleRemoveAttendance(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Grades Manager */}
      <div className="grades-manager">
        <h3>Grades</h3>
        <div className="grades-header">
          <p>Grades List</p>
          <input
            type="text"
            placeholder="Enter title"
            value={newGrade.title}
            onChange={(e) => setNewGrade({ ...newGrade, title: e.target.value })}
            className="grade-title-input"
          />
          <input
            type="text"
            placeholder="Enter grade"
            value={newGrade.grade}
            onChange={handleGradeInputChange}
            className="grade-input"
          />
          <button className="add-grade-button" onClick={handleAddGrade}>
            Confirm
          </button>
        </div>
        <ul className="grades-list">
          {gradesList.map((entry, index) => (
            <li key={index} className="grades-item">
              <span>{entry.title}</span>
              <span>{entry.grade}</span>
              <button
                className="remove-button"
                onClick={() => handleRemoveGrade(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentManagePage;
