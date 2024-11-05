import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./UserSelection.css";

function UserSelection() {
    const navigate = useNavigate();

    const navigateToLogin = (userType) => {
        navigate(`/login?userType=${userType}`);
    };

    return (
        <div className="main-container">
            {/* Left half with white background and centered component */}
            <div className="left-half">
                <div className="content-box">
                    <h2>ClassTrack</h2>
                </div>
            </div>

            {/* Right half with teal background and selection options */}
            <div className="right-half">
                <div className="user-selection-container">
                    <h2>Alege Tipul de Utilizator</h2>
                    <button onClick={() => navigateToLogin('student')}>Elev</button>
                    <button onClick={() => navigateToLogin('teacher')}>Profesor</button>
                    <button onClick={() => navigateToLogin('parent')}>Părinte</button>
                </div>
            </div>
        </div>
    );
}

export default UserSelection;
