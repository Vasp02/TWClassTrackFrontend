import React, { useState, useEffect } from 'react';
import './Dashboard_professor.css';
import Header from '../Header/Header';
import { FaChalkboardTeacher } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard_professor() {
    const [userData, setUserData] = useState(null);
    const [classes, setClasses] = useState([]); // State for storing classrooms
    const navigate = useNavigate();

    useEffect(() => {
        console.log("useEffect running for professor dashboard");

        const token = localStorage.getItem('jwtToken');
        console.log("Retrieved token:", token);

        if (token) {
            // Validate token and fetch professor info
            axios
                .get('http://localhost:8080/api/professors/token/validate', {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    console.log("response", response);

                    if (response.status === 200 && response.data) {
                        setUserData(response.data); // Store professor info in state
                        console.log("Professor data:", response.data);

                        // Fetch classrooms for the professor
                        fetchClassrooms(token);
                    }
                })
                .catch((error) => {
                    console.error("Token validation failed:", error);
                });
        }
    }, []);

    const fetchClassrooms = (token) => {
    axios
        .get('http://localhost:8080/api/professors/classrooms', {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
            console.log("Classrooms API response:", response.data);
            if (response.status === 200 && Array.isArray(response.data)) {
                setClasses(response.data);
            } else {
                console.error("Unexpected API response format:", response.data);
                setClasses([]); // Fallback to empty array
            }
        })
        .catch((error) => {
            console.error("Error fetching classrooms:", error);
            setClasses([]); // Handle error by resetting to empty array
        });
};


    const handleClassClick = (classId) => {
        console.log("Navigating to class ID:", classId);
        navigate(`/class/${classId}/teacher`);
    };

    const handleCreateClassroom = () => {
        navigate('/create-classroom');
    };

    return (
        <div className="dashboard-container">
            <Header userData={userData} />

            <div className="content">
                <aside className="sidebar">
                    <h3>My Classes</h3>
                    <button
                        className="create-classroom-button"
                        onClick={handleCreateClassroom}
                    >
                        Create Classroom
                    </button>
                    <ul className="class-list">
                        {classes.map((classItem) => (
                            <li
                                key={classItem.id}
                                onClick={() => handleClassClick(classItem.id)}
                            >
                                <FaChalkboardTeacher className="class-icon" />
                                {classItem.name}
                            </li>
                        ))}
                    </ul>
                </aside>

                <div className="class-cards-container">
                    <main className="class-cards">
                        {console.log("Classes array:", classes)}
                        {classes.map((classItem) => (
                            
                            <div
                            className="class-card"
                            key={classItem.id}
                            onClick={() => handleClassClick(classItem.id)}
                        >
                            {console.log(classItem)}
                            <div className="class-card-header" style={{ backgroundColor: "#4caf50" }}>
                                <h4 className="class-card-title">{classItem.name}</h4>
                            </div>
                            <div className="class-card-body">
                                <p><strong>Professor:</strong> {classItem.professor.firstName}</p>
                                <p><strong>Email:</strong> {classItem.professor.email}</p>
                            </div>
                        </div>
                        
                        ))}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default Dashboard_professor;
