import React, { useState } from 'react';
import './Create_Classroom.css';
import Header from '../Header/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Create_Classroom() {
    const [className, setClassName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleCreateClassroom = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('jwtToken');

        if (!token) {
            setErrorMessage("You are not authorized to perform this action.");
            return;
        }

        // const classroomData = {
        //     name: className,
        //     professor: 0, // Placeholder, backend assigns this
        //     studentList: [], // Empty student list initially
        //     inviteCode: "" // Backend generates this
        // };

        //console.log("classroomData", classroomData);
        console.log("classname", className);
        try {
            const response = await axios.post(

                'http://localhost:8080/api/classrooms/create',
                className,
                {
                    headers: { Authorization: `Bearer ${token}` },
    
                }

            );
            

            if (response.status === 201) {
                setSuccessMessage("Classroom created successfully!");
                setTimeout(() => navigate('/dashboard-professor'), 1500); // Redirect after success
            } else {
                setErrorMessage("Failed to create classroom. Please try again.");
            }
        } catch (error) {
            setErrorMessage(
                error.response?.data?.message || "An unexpected error occurred."
            );
        }
    };

    return (
        <div className="create-classroom-container">
            <Header />
            <div className="create-classroom-content">
                <h2>Create a New Classroom</h2>
                <form onSubmit={handleCreateClassroom}>
                    <div className="form-group">
                        <label htmlFor="className">Classroom Name</label>
                        <input
                            type="text"
                            id="className"
                            value={className}
                            onChange={(e) => setClassName(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="create-button">
                        Create Classroom
                    </button>
                </form>
                {successMessage && <p className="success-message">{successMessage}</p>}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
        </div>
    );
}

export default Create_Classroom;
