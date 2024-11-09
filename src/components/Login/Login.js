import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { baseUrl } from '../../config/axiosConfig.js';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${baseUrl}/api/students/login`, {
                email: email,
                password: password
            });

            if (response.status === 200) {
                alert("Login successful");
                navigate('/dashboard');
            } else {
                alert("Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred during login.");
        }
    };

    return (
        <div className="form-container">
            <h2>Log in</h2>
            <form onSubmit={handleLogin}>
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

                <button type="submit" className="main-button">Log in</button>
            </form>
        </div>
    );
};

export default Login;
