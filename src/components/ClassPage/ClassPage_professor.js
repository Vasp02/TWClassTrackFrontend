import React, { useState } from 'react';
import './ClassPage_professor.css';

function ClassPage() {
    // Example hardcoded student grades
    const [grades, setGrades] = useState([
        { student: 'Alice Johnson', assignment: 'Homework 1', grade: 'A' },
        { student: 'Bob Smith', assignment: 'Homework 1', grade: 'B+' },
        { student: 'Charlie Brown', assignment: 'Homework 1', grade: 'A-' },
    ]);

    // Example hardcoded student attendance
    const [attendance, setAttendance] = useState([
        { student: 'Alice Johnson', present: true },
        { student: 'Bob Smith', present: false },
        { student: 'Charlie Brown', present: true },
    ]);

    // Update a grade for a specific student
    const handleGradeChange = (index, value) => {
        const updatedGrades = [...grades];
        updatedGrades[index].grade = value;
        setGrades(updatedGrades);
    };

    // Update attendance for a specific student
    const handleAttendanceChange = (index) => {
        const updatedAttendance = [...attendance];
        updatedAttendance[index].present = !updatedAttendance[index].present;
        setAttendance(updatedAttendance);
    };

    // Save changes (mock function)
    const handleSaveChanges = () => {
        console.log('Grades saved:', grades);
        console.log('Attendance saved:', attendance);
        alert('Changes saved successfully!');
    };

    return (
        <div className="class-page-container">
            <h2 className="class-page-title">Class Details</h2>
            <div className="table-container">
                {/* Grades Section */}
                <div className="table-section">
                    <h3>Grades</h3>
                    <div className="table-header table-row">
                        <div>Student</div>
                        <div>Assignment</div>
                        <div>Grade</div>
                    </div>
                    {grades.map((grade, index) => (
                        <div className="table-row" key={index}>
                            <div>{grade.student}</div>
                            <div>{grade.assignment}</div>
                            <div>
                                <input
                                    type="text"
                                    value={grade.grade}
                                    onChange={(e) => handleGradeChange(index, e.target.value)}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Attendance Section */}
                <div className="table-section">
                    <h3>Attendance</h3>
                    <div className="table-header table-row">
                        <div>Student</div>
                        <div>Present</div>
                    </div>
                    {attendance.map((entry, index) => (
                        <div className="table-row" key={index}>
                            <div>{entry.student}</div>
                            <div>
                                <input
                                    type="checkbox"
                                    checked={entry.present}
                                    onChange={() => handleAttendanceChange(index)}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Save Changes Button */}
                <div className="save-button-container">
                    <button onClick={handleSaveChanges}>Save Changes</button>
                </div>
            </div>
        </div>
    );
}

export default ClassPage;
