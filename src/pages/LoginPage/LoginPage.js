import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import Login from '../../components/Login/Login';

function LoginPage({userType}) {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="main-container">
            <div className="left-half">
                <h1>ClassTrack</h1>
            </div>

            <div className="right-half">
                <div className="login-container">
                    <Login/>
                    <div className="login-info">
                        <h2>Attendance Management System</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
