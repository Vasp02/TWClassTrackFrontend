// src/pages/Dashboard.js
import React from 'react';
import './Dashboard.css';
import Header from '../Header/Header';
import { FaBook } from 'react-icons/fa';

function Dashboard() {
    const classes = [
        { title: '2024/25 - Mathematics', instructor: 'Dr. Smith', dueDate: 'Assignment due: Tomorrow' },
        { title: 'Physics', instructor: 'Dr. Adams', dueDate: 'Lab report due: Friday' },
        { title: 'Chemistry', instructor: 'Dr. Johnson', dueDate: 'Project due: Next Monday' },
    ];

    return (
        <div className="dashboard-container">
            <Header className="header" />

            <div className="content">
                <aside className="sidebar">
                    <h3>My Classes</h3>
                    <ul className="class-list">
                        {classes.map((classItem, index) => (
                            <li key={index}>
                                <FaBook className="class-icon" />
                                {classItem.title}
                            </li>
                        ))}
                    </ul>
                </aside>
                
                <div className="class-cards-container">
                    <main className="class-cards">
                        {classes.map((classItem, index) => (
                            <div className="class-card" key={index}>
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
