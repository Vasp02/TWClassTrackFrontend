import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpLoginMenu.css';

const SignUpLoginMenu = () => {
    const navigate = useNavigate();

    return (
        <div className="main-container">
            <div className="left-half">
                <div className="content-box">
                    <h2>ClassTrack</h2>
                </div>
            </div>

            <div className="right-half">
                <div className="user-selection-container">
                    <h2>Welcome to ClassTrack</h2>
                    <button onClick={() => navigate('/signup')}>Sign Up</button>
                    <button onClick={() => navigate('/login')}>Login</button>
                </div>
            </div>
        </div>
    );
};

export default SignUpLoginMenu;
