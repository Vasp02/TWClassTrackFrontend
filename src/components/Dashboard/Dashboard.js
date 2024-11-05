import React from 'react';
import './Dashboard.css'; // Import the CSS file for styling

function Dashboard() {
    return (
        <div className="dashboard-container">
            {/* Sidebar for Statistics */}
            <aside className="sidebar">
                <h3>Statistics</h3>
                <div className="stat-item">Attendance: 85%</div>
                <div className="stat-item">Average Grade: B+</div>
                {/* Add more stat items as needed */}
            </aside>

            {/* Main section for class cards */}
            <main className="class-cards">
                {/* Example class card */}
                <div className="class-card">
                    <h4>2024/25 - Mathematics</h4>
                    <p>Instructor: Dr. Smith</p>
                </div>
                <div className="class-card">
                    <h4>Physics</h4>
                    <p>Instructor: Dr. Adams</p>
                </div>
                <div className="class-card">
                    <h4>Chemistry</h4>
                    <p>Instructor: Dr. Johnson</p>
                </div>
                {/* Add more cards dynamically or as placeholders */}
            </main>
        </div>
    );
}

export default Dashboard;
