import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ClassPage_professor.css";

const ClassPage_professor = () => {
  const { id } = useParams();
  const [classroom, setClassroom] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClassroom = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/classrooms/${id}`
        );
        setClassroom(response.data);
      } catch (err) {
        setError("Classroom not found or an error occurred.");
      }
    };

    fetchClassroom();
  }, [id]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!classroom) {
    return <div className="loading-message">Loading...</div>;
  }

  return (
    <div className="class-page-container">
      <div className="classroom-header">
        <div className="classroom-header-content">
          <h1 className="classroom-title">{classroom.name}</h1>
          <p className="classroom-professor">
            <strong>Professor:</strong> {classroom.professor.name}
          </p>
          <p className="classroom-email">
            <strong>Email:</strong> {classroom.professor.email}
          </p>
        </div>
      </div>

      <div className="class-details">
        <p><strong>Classroom ID:</strong> {classroom.id}</p>
        <p><strong>Invite Code:</strong> {classroom.inviteCode}</p>
        <h2 className="student-list-title">Enrolled Students:</h2>
        <ul className="student-list">
          {classroom.studentList.map((student) => (
            <li key={student.id} className="student-item">{student.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClassPage_professor;
