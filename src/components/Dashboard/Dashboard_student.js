import React, { useState, useEffect } from 'react';
import './Dashboard_student.css';
import Header from '../Header/Header';
import { FaBook } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        console.log("useEffect running")

        const token = localStorage.getItem('jwtToken');
        console.log("Retrieved token:", token);

        if (token) {
            axios.get('http://localhost:8080/api/students/token/validate', {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                console.log("response",response)

                if (response.status === 200 && response.data) {
                    setUserData(response.data); // Store user info in state
                    console.log("User data:", response.data);
                }
            })
            .catch(error => {
                console.error("Token validation failed:", error);
            });
        }
    }, []);

    const classes = [
        { title: '2024/25 - Mathematics', instructor: 'nume', dueDate: 'Assignment due: Tomorrow' },
        { title: 'Physics', instructor: 'Dr. Adams', dueDate: 'Lab report due: Friday' },
        { title: 'Chemistry', instructor: 'Dr. Johnson', dueDate: 'Project due: Next Monday' },
    ];

    const handleClassClick = (classId) => {
        navigate(`/class/${classId}`);
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
                                <FaBook className="class-icon" />
                                {classItem.title}
                            </li>
                        ))}
                    </ul>
                </aside>
                
                <div className="class-cards-container">
                    <main className="class-cards">
                        {classes.map((classItem) => (
                            <div className="class-card" key={classItem.id} onClick={() => handleClassClick(classItem.id)}>
                                <h4>{classItem.title}</h4>
                                <p>Instructor: {classItem.instructor}</p>
                                <p className="due-date">{classItem.dueDate}</p>
                            </div>
                        ))}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
