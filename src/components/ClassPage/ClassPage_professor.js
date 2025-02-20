import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";
import "./ClassPage_professor.css";

const ClassPage_professor = () => {
  const { id } = useParams();
  const [classroom, setClassroom] = useState(null);
  const [error, setError] = useState(null);
  const [inviteCode, setInviteCode] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [addError, setAddError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClassroom = async () => {
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

        setClassroom({ ...classroomData, name: parsedName });
  
      } catch (err) {
        setError("Classroom not found or an error occurred.");
      }
    };
  
    fetchClassroom();
  }, [id]);
  

  const handleAddStudent = async () => {
    try {
      setSuccessMessage(null);
      setAddError(null);
      const token = localStorage.getItem("jwtToken");

      await axios.post(
        `http://localhost:8080/api/classrooms/invite/${id}/${inviteCode}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccessMessage("Student added successfully.");
      setInviteCode("");

      const updatedClassroom = await axios.get(`http://localhost:8080/api/classrooms/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClassroom(updatedClassroom.data);
    } catch (err) {
      setAddError(err.response?.data?.message || "Failed to add student.");
    }
  };

  const handleStudentRemove = async (studentId) => {
    try {
      const token = localStorage.getItem("jwtToken");
      await axios.delete(`http://localhost:8080/api/classrooms/remove/${id}/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedClassroom = await axios.get(`http://localhost:8080/api/classrooms/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClassroom(updatedClassroom.data);
      setSuccessMessage("Student removed successfully.");
    } catch (err) {
      setAddError(err.response?.data?.message || "Failed to remove student.");
    }
  };

  const handleManageStudent = (studentID) => {
    navigate(`/class/${classroom.id}/manage/${studentID}`);
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!classroom) {
    return <div className="loading-message">Loading...</div>;
  }

  return (
    <div className="class-page-container">
      <Header userData={{ firstName: "Professor" }} />

      <div className="classroom-header">
        <div className="classroom-header-content">
          <h1 className="classroom-title">{classroom.name}</h1>
          <p className="classroom-professor">
            <strong>Professor:</strong> {classroom.professor.firstName}
          </p>
          <p className="classroom-email">
            <strong>Email:</strong> {classroom.professor.email}
          </p>
        </div>
      </div>

      <div className="class-details">
        

        <h2 className="student-list-title">Enrolled Students:</h2>
        <ul className="student-list">
          {classroom.studentList.map((student) => (
            <li key={student.id} className="student-item">
              <h4>{student.firstName} {student.lastName}</h4>
              <div className="buttons-container-div">
                <button className="manage-button" onClick={() => handleManageStudent(student.id)}>
                  Manage
                </button>
                <button className="remove-button" onClick={() => handleStudentRemove(student.id)}>
                  Remove
                </button>
              </div>
            </li>
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
        <button onClick={handleAddStudent} className="add-student-button">
          Add Student
        </button>
      </div>
    </div>
  );
};

export default ClassPage_professor;
