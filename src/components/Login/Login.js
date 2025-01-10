import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../config/axiosConfig.js';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!userType) {
            alert("Please select a user type (Student, Teacher, or Parent).");
            return;
        }
        const loginUrl = `${baseUrl}/api/${
            userType === 'teacher'
                ? 'professors'
                : userType === 'student'
                ? 'students'
                : 'parents'
        }/login`;

        try {
            const response = await axios.post(loginUrl, {
                email: email,
                password: password,
            });

            if (response.status === 200 && response.data.token) {
                const token = response.data.token;
                localStorage.setItem('jwtToken', token);
                console.log('Token saved:', localStorage.getItem('jwtToken'));
                alert('Login successful');
                if (userType === 'teacher') {
                    navigate('/dashboard/professor');
                } else if (userType === 'student') {
                    navigate('/dashboard/student');
                } else if (userType === 'parent') {
                    navigate('/dashboard-parent');
                }
            } else {
                alert('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login.');
        }
    };

    return (
        <div className="form-container">
            <h2>Log in</h2>
            <form onSubmit={handleLogin}>
                <div className="radio-group">
                    <label>
                        <input
                            type="radio"
                            name="userType"
                            value="teacher"
                            checked={userType === 'teacher'}
                            onChange={(e) => setUserType(e.target.value)}
                        />
                        Teacher
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="userType"
                            value="student"
                            checked={userType === 'student'}
                            onChange={(e) => setUserType(e.target.value)}
                        />
                        Student
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="userType"
                            value="parent"
                            checked={userType === 'parent'}
                            onChange={(e) => setUserType(e.target.value)}
                        />
                        Parent
                    </label>
                </div>

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" className="main-button">
                    Log in
                </button>
            </form>
        </div>
    );
};

export default Login;
