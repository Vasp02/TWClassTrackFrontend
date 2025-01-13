import React, { useState, useEffect } from 'react';
import './Dashboard_parents.css';
import Header from '../Header/Header';
import axios from 'axios';

function Dashboard_parents() {
    const [userData, setUserData] = useState(null);
    const [studentData, setStudentData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("useEffect running for parent dashboard");

        const token = localStorage.getItem('jwtToken');
        console.log("Retrieved token:", token);

        if (token) {
            axios
                .get('http://localhost:8080/api/parents/token/validate', {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    console.log("Parent validated:", response);
                    if (response.status === 200 && response.data) {
                        setUserData(response.data);
                        setStudentData([
                            { className: 'Mathematics', grade: 'A' },
                            { className: 'Physics', grade: 'B+' },
                            { className: 'Chemistry', grade: 'A-' },
                        ]);
                    }
                })
                .catch((error) => {
                    console.error("Token validation failed:", error);
                    setError("Failed to validate parent or fetch data.");
                });
        }
    }, []);

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="dashboard-container">
            <Header userData={userData} />

            <div className="content">
                <aside className="sidebar">
                    <h3>Parent Dashboard</h3>
                    <p>View your student's performance</p>
                </aside>

                <div className="student-table-container">
                    <h2 className="student-table-title">Student Performance</h2>
                    <table className="student-table">
                        <thead>
                            <tr>
                                <th>Class</th>
                                <th>Final Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.className}</td>
                                    <td>{item.grade}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Dashboard_parents;
