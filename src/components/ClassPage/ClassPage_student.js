import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import axios from "axios";
import "./ClassPage_student.css";

const ClassPage_student = () => {
  const { id } = useParams();
  const [classroom, setClassroom] = useState({
    name: "Math 101",
    attendance: [
      { date: "2023-12-01", status: "Present" },
      { date: "2023-12-02", status: "Absent" },
    ],
    grades: [
      { assignment: "Quiz 1", grade: "A" },
      { assignment: "Project", grade: "B+" },
    ],
  });
  const [professor, setProfessor] = useState(null);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchClassroom = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/classrooms/${id}`
        );
        setClassroom({
          name: response.data.name || "Unnamed Class",
          attendance: response.data.attendance || classroom.attendance,
          grades: response.data.grades || classroom.grades,
        });

        fetchProfessor(response.data.professor.id);
      } catch (err) {
        setError("Classroom not found or an error occurred.");
      }
    };

    fetchClassroom();
    fetchTokenData();
  }, [id]);

  const fetchProfessor = async (professorId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/professors/${professorId}`
      );
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
          }
        })
        .catch((error) => {
          console.error("Token validation failed:", error);
        });
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!classroom || !professor) {
    return <div className="loading-message">Loading...</div>;
  }

  return (
    <div className="class-page-container">
      {/* Fixed header layout */}
      <Header userData={{ firstName: userData?.firstName }} />
      
      <div className="class-info-box">
        <h2 className="class-info-title">{classroom.name}</h2>
        <p className="class-info-teacher">
          Professor: {professor ? professor.firstName : "Loading..."}
        </p>
      </div>

      <div className="list-container">
        {/* Attendance List */}
        <div className="attendance-list">
          <h3 className="list-title">Attendance</h3>
          <ul className="list">
            {classroom.attendance.map((entry, index) => (
              <li key={index} className="list-item">
                <h4>{entry.date}</h4>
                <span>{entry.status}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Grades List */}
        <div className="grades-list">
          <h3 className="list-title">Grades</h3>
          <ul className="list">
            {classroom.grades.map((grade, index) => (
              <li key={index} className="list-item">
                <h4>{grade.assignment}</h4>
                <span>{grade.grade}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ClassPage_student;
