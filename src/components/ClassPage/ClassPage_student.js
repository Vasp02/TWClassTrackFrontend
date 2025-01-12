import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import axios from "axios";
import "./ClassPage_student.css";

const ClassPage_student = () => {
  const { id } = useParams(); // Classroom ID
  const [classroom, setClassroom] = useState({
    name: "",
    attendance: [],
    grades: [],
  });
  const [professor, setProfessor] = useState(null);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  const fetchClassroomData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/classrooms/${id}`);
      const classroomData = response.data;

      setClassroom((prev) => ({
        ...prev,
        name: classroomData.name || "Unnamed Class",
      }));

      if (classroomData.professor?.id) {
        fetchProfessor(classroomData.professor.id);
      }
    } catch (err) {
      setError("Classroom not found or an error occurred.");
    }
  };

  const fetchAttendanceData = async (studentId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/attendances/student/${studentId}/classroom/${id}`
      );
      setClassroom((prev) => ({
        ...prev,
        attendance: response.data.map((entry) => ({
          date: entry.date,
          status: entry.status === "present" ? "Present" : "Absent",
        })),
      }));
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  const fetchGradesData = async (studentId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/assignments/student/${studentId}/classroom/${id}`
      );
      setClassroom((prev) => ({
        ...prev,
        grades: response.data.map((entry) => ({
          assignment: entry.name,
          grade: entry.grade,
        })),
      }));
    } catch (error) {
      console.error("Error fetching grades data:", error);
    }
  };

  const fetchProfessor = async (professorId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/professors/${professorId}`);
      setProfessor(response.data);
    } catch (err) {
      console.error("Error fetching professor details:", err);
    }
  };

  const fetchTokenData = () => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      axios
        .get("http://localhost:8080/api/students/token/validate", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.status === 200 && response.data) {
            setUserData(response.data);
            fetchAttendanceData(response.data.id);
            fetchGradesData(response.data.id);
          }
        })
        .catch((error) => {
          console.error("Token validation failed:", error);
        });
    }
  };

  useEffect(() => {
    fetchClassroomData();
    fetchTokenData();
  }, [id]);

  // 🟢 Calculate Average Grade
  const calculateAverageGrade = () => {
    if (classroom.grades.length === 0) return "0";
    const total = classroom.grades.reduce((sum, grade) => sum + grade.grade, 0);
    return (total / classroom.grades.length).toFixed(2);
  };

  // 🟢 Calculate Attendance Percentage
  const calculateAttendancePercentage = () => {
    if (classroom.attendance.length === 0) return "0%";
    const presentCount = classroom.attendance.filter((entry) => entry.status === "Present").length;
    return ((presentCount / classroom.attendance.length) * 100).toFixed(2) + "%";
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!classroom || !professor) {
    return <div className="loading-message">Loading...</div>;
  }

  return (
    <div className="class-page-container">
      {/* Header */}
      <Header userData={{ firstName: userData?.firstName }} />

      {/* Class Info Section */}
      <div className="class-info-box">
        <h2 className="class-info-title">{classroom.name}</h2>
        <p className="class-info-teacher">
          Professor: {professor ? professor.firstName : "Loading..."}
        </p>
      </div>

      {/* Lists Section */}
      <div className="list-container">
        {/* Attendance List */}
        <div className="attendance-list">
          <h3 className="list-title">Attendance</h3>
          <ul className="list">
            {classroom.attendance.length > 0 ? (
              classroom.attendance.map((entry, index) => (
                <li key={index} className="list-item">
                  <h4>{entry.date}</h4>
                  <span>{entry.status}</span>
                </li>
              ))
            ) : (
              <p className="no-data-message">No attendance records available.</p>
            )}
          </ul>
        </div>

        {/* Grades List */}
        <div className="grades-list">
          <h3 className="list-title">Grades</h3>
          <ul className="list">
            {classroom.grades.length > 0 ? (
              classroom.grades.map((grade, index) => (
                <li key={index} className="list-item">
                  <h4>{grade.assignment}</h4>
                  <span>{grade.grade}</span>
                </li>
              ))
            ) : (
              <p className="no-data-message">No grades available.</p>
            )}
          </ul>
        </div>
      </div>

      {/* 🟢 Overall Results */}
      <div className="overall-results">
        <h3>Overall Results</h3>
        <div className="result-box">
          <p><strong>Average Grade:</strong> {calculateAverageGrade()}</p>
          <p><strong>Attendance Percentage:</strong> {calculateAttendancePercentage()}</p>
        </div>
      </div>
    </div>
  );
};

export default ClassPage_student;