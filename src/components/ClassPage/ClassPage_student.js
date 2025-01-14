import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import axios from "axios";
import "./ClassPage_student.css";

const ClassPage_student = () => {
  const { id } = useParams();

  const [attendance, setAttendance] = useState([]);
  const [grades, setGrades] = useState([]);
  const [classroom, setClassroom] = useState(null);

  const [professor, setProfessor] = useState(null);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  const fetchClassroomData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/classrooms/${id}`);
      const classroomData = response.data;

      let parsedName = classroomData.name;
      try {
        const parsed = JSON.parse(classroomData.name);
        if (parsed && parsed.name) {
          parsedName = parsed.name;
        }
      } catch (error) {
        console.warn("Failed to parse classroom name, using raw name:", classroomData.name);
      }

      setClassroom({ name: parsedName });

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
      setAttendance(
        response.data.map((entry) => ({
          date: entry.date,
          status: entry.present ? "Present" : "Absent",
        }))
      );
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  const fetchGradesData = async (studentId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/assignments/student/${studentId}/classroom/${id}`
      );
      setGrades(
        response.data.map((entry) => ({
          assignment: entry.name,
          grade: entry.grade,
        }))
      );
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

  const calculateAverageGrade = () => {
    if (grades.length === 0) return "0";
    const total = grades.reduce((sum, grade) => sum + grade.grade, 0);
    return (total / grades.length).toFixed(2);
  };

  const calculateAttendancePercentage = () => {
    if (attendance.length === 0) return "0%";
    const presentCount = attendance.filter((entry) => entry.status === "Present").length;
    return ((presentCount / attendance.length) * 100).toFixed(2) + "%";
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!classroom || !professor) {
    return <div className="loading-message">Loading...</div>;
  }

  return (
    <div className="class-page-container">
      <Header userData={{ firstName: userData?.firstName }} />

      <div className="class-info-box">
        <h2 className="class-info-title">{classroom.name}</h2>
        <p className="class-info-teacher">
          Professor: {professor ? professor.firstName : "Loading..."}
        </p>
      </div>

      <div className="list-container">
        <div className="attendance-list">
          <h3 className="list-title">Attendance</h3>
          <ul className="list">
            {attendance.length > 0 ? (
              attendance.map((entry, index) => (
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

        <div className="grades-list">
          <h3 className="list-title">Grades</h3>
          <ul className="list">
            {grades.length > 0 ? (
              grades.map((grade, index) => (
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
