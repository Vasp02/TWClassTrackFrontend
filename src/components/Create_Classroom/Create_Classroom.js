import React, { useState, useEffect } from 'react';
import './Create_Classroom.css';
import Header from '../Header/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Create_Classroom() {
    const [className, setClassName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [professorData, setProfessorData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProfessorData();
    }, []);

    const fetchProfessorData = async () => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            setErrorMessage("You are not authorized to perform this action.");
            return;
        }

        try {
            const response = await axios.get(
                'http://localhost:8080/api/professors/token/validate',
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 200 && response.data) {
                setProfessorData(response.data);
            }
        } catch (error) {
            console.error("Error fetching professor data:", error);
        }
    };

    const handleCreateClassroom = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('jwtToken');

        if (!token) {
            setErrorMessage("You are not authorized to perform this action.");
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:8080/api/classrooms/create',
                { name: className },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 201) {
                setSuccessMessage("Classroom created successfully!");
                setTimeout(() => navigate('/dashboard/professor'), 1500);
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
        <div className="create-classroom-page">
            <Header userData={{ firstName: professorData?.firstName }} />

            <div className="create-classroom-container">
                <h2>Create a New Classroom</h2>

                <form onSubmit={handleCreateClassroom}>
                    <div className="form-group">
                        <input
                            type="text"
                            id="className"
                            value={className}
                            onChange={(e) => setClassName(e.target.value)}
                            placeholder="Enter classroom name"
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
