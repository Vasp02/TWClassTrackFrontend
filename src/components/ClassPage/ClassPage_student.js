import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import axios from "axios";
import "./ClassPage_student.css";

const ClassPage_student = () => {
  const { id } = useParams();
  const [classroom, setClassroom] = useState(null);
  const [professor, setProfessor] = useState(null);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchClassroom = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/classrooms/${id}`
        );
        setClassroom(response.data);

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
    const token = localStorage.getItem('jwtToken');
    console.log("Retrieved token:", token);

    if (token) {
        axios
            .get('http://localhost:8080/api/students/token/validate', {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                console.log("Response:", response);

                if (response.status === 200 && response.data) {
                    setUserData(response.data);
                    console.log("User data:", response.data);
                }
            })
            .catch((error) => {
                console.error("Token validation failed:", error);
            });
    }
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!classroom || !professor) {
    return <div className="loading-message">Loading...</div>;
  }

  return (
    <div className="class-page-container">
      <div className="dashboard-header">
        <Header userData={{ firstName: userData.firstName }} /> 
      </div>

      <div className="class-info-box">
        <h2 className="class-info-title">{classroom.name}</h2>
        <p className="class-info-teacher">Professor: {professor.firstName} {professor.lastName}</p>
      </div>

      <div className="class-table-container">
        <table className="class-data-table">
          <thead>
            <tr>
              <th>Students Enrolled</th>
              <th>Grades</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index}>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassPage_student;
