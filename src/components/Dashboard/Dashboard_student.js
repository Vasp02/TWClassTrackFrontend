import React, { useState, useEffect } from 'react';
import './Dashboard_student.css';
import Header from '../Header/Header';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard_student() {
    const [userData, setUserData] = useState(null);
    const [classes, setClasses] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
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
    
                        // Fetch classrooms only after successful token validation
                        fetchClassrooms(token);
                    }
                })
                .catch((error) => {
                    console.error("Token validation failed:", error);
                    localStorage.removeItem('jwtToken'); // Clear token
                    navigate('/login'); // Redirect to login page
                });
        } else {
            navigate('/login'); // Redirect to login if no token
        }
    }, []); // Empty dependency array ensures it runs only once
    

    const fetchClassrooms = (token) => {
        axios
            .get('http://localhost:8080/api/students/classrooms', {
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
        console.log('Navigating to class ID:', classId);
        navigate(`/class/${classId}/student`);
    };

    return (
        <div className="dashboard-container">
            <Header userData={userData} />

            <div className="content">
                <aside className="sidebar">
                    <h3>My Classes</h3>
                    <ul className="class-list">
                        {classes.map((classItem) => (
                            <li key={classItem.id} onClick={() => handleClassClick(classItem.id)}>
                                <FaChalkboardTeacher className="class-icon" />
                                {classItem.name}
                            </li>
                        ))}
                    </ul>
                </aside>

                <div className="class-cards-container">
                    <main className="class-cards">
                        {classes.map((classItem) => (
                            <div
                                className="class-card"
                                key={classItem.id}
                                onClick={() => handleClassClick(classItem.id)}
                            >
                                <div className="class-card-header" style={{ backgroundColor: '#4caf50' }}>
                                    <h4 className="class-card-title">{classItem.name}</h4>
                                </div>
                                <div className="class-card-body">
                                    <p>
                                        <strong>Professor:</strong> {classItem.professor.firstName}
                                    </p>
                                    <p>
                                        <strong>Email:</strong> {classItem.professor.email}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default Dashboard_student;
