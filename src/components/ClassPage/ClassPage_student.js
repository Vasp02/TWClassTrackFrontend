import React from 'react';
import './ClassPage_student.css';

function ClassPage() {
    // Example data
    const grades = [
        { subject: 'Homework 1', grade: 'A', weight: '10%' },
        { subject: 'Test 1', grade: 'B+', weight: '20%' },
        { subject: 'Test 2', grade: 'A-', weight: '25%' },
    ];

    const attendance = [
        { date: '2024-10-01', status: 'Present' },
        { date: '2024-10-03', status: 'Absent' },
    ];  

    const messages = [
        { date: '2024-10-05', message: 'Nice work!' },
        { date: '2024-10-10', message: 'Good job!' },
    ];

    return (
        <div className="class-page-container">
            <h2 className="class-page-title">Class Details</h2>
            <div className="table-container">
                {/* Grades Section */}
                <div className="table-section">
                    <h3>Grades</h3>
                    <div className="table-header table-row">
                        <div>Assignment</div>
                        <div>Grade</div>
                        <div>Weight</div>
                    </div>
                    {grades.map((grade, index) => (
                        <div className="table-row" key={index}>
                            <div>{grade.subject}</div>
                            <div>{grade.grade}</div>
                            <div>{grade.weight}</div>
                        </div>
                    ))}
                </div>

                {/* Attendance Section */}
                <div className="table-section">
                    <h3>Attendance</h3>
                    <div className="table-header table-row">
                        <div>Date</div>
                        <div>Status</div>
                    </div>
                    {attendance.map((entry, index) => (
                        <div className="table-row" key={index}>
                            <div>{entry.date}</div>
                            <div>{entry.status}</div>
                        </div>
                    ))}
                </div>

                {/* Messages Section */}
                <div className="table-section">
                    <h3>Messages</h3>
                    <div className="table-header table-row">
                        <div>Date</div>
                        <div>Message</div>
                    </div>
                    {messages.map((msg, index) => (
                        <div className="table-row" key={index}>
                            <div>{msg.date}</div>
                            <div>{msg.message}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ClassPage;
