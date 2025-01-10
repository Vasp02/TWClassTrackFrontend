import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../ClassPage/ClassPage_professor.css";

const ClassPage_professor = () => {
  const { id } = useParams();
  const [classroom, setClassroom] = useState(null);
  const [error, setError] = useState(null);
  const [inviteCode, setInviteCode] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [addError, setAddError] = useState(null);
  const [userData, setUserData] = useState(null);

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
    fetchTokenData();
  }, [id]);

  const handleAddStudent = async (code) => {
    try {
      setSuccessMessage(null);
      setAddError(null);
      const token = localStorage.getItem('jwtToken'); // Retrieve the token from local storage
  
      const response = await axios.post(
        `http://localhost:8080/api/classrooms/invite/${id}/${code}`,
        {}, // Include an empty body if required
        {
          headers: { Authorization: `Bearer ${token}` }, // Add Authorization header
        }
      );
  
      console.log("Response", response);
      setSuccessMessage(response.data.message || "Student added successfully.");
      setInviteCode("");
  
      // Refresh classroom data to include the newly added student
      const updatedClassroom = await axios.get(
        `http://localhost:8080/api/classrooms/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }, // Include token for subsequent requests
        }
      );
      setClassroom(updatedClassroom.data);
    } catch (err) {
      setAddError(err.response?.data?.message || "Failed to add student.");
    }
  };

  const handleStudentRemove = async (studentId) => {
    try {
      const token = localStorage.getItem("jwtToken"); // Retrieve the token from local storage
      await axios.delete(
        `http://localhost:8080/api/classrooms/remove/${id}/${studentId}`,
        {
          headers: { Authorization: `Bearer ${token}` }, // Add Authorization header
        }
      );
  
      // Refresh classroom data after removing the student
      const updatedClassroom = await axios.get(
        `http://localhost:8080/api/classrooms/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setClassroom(updatedClassroom.data);
      setSuccessMessage("Student removed successfully.");
    } catch (err) {
      setAddError(err.response?.data?.message || "Failed to remove student.");
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
            // TODO aranjeaza la divu asta sa fie frumos gen orizontal cu buton frumos feherkes
            <div>  
                <h4 key={student.id} className="student-item">{student.firstName} {student.lastName}</h4>
                <button onClick={() => handleStudentRemove(student.id)}>Remove</button>
            </div>
            
          ))}
        </ul>
      </div>

      <div className="add-student-panel">
        <h2>Add a Student</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {addError && <p className="error-message">{addError}</p>}
        <input
          type="text"
          placeholder="Enter student invite code"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
          className="invite-code-input"
        />
        <button
          onClick={() => handleAddStudent(inviteCode)}
          className="add-student-button"
        >
          Add Student
        </button>
      </div>
    </div>
  );
};

export default ClassPage_professor;
