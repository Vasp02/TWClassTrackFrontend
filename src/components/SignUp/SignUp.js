import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [userType, setUserType] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!userType) {
            alert("Please select a user type (Student, Teacher, or Parent).");
            return;
        }

        const signupUrl = `http://localhost:8080/api/${userType === 'teacher' ? 'professors' : userType === 'student' ? 'students' : 'parents'}/signup`;

        try {
            const response = await axios.post(signupUrl, {
                firstName,
                lastName,
                email,
                password,
                userType,
                memberCode: '12346',
                classesEnroledInto: []
            });

            if (response.status === 201) {
                alert("Sign Up successful! You can now log in.");
                navigate('/login');
            } else {
                alert("Sign Up failed. Please try again.");
            }
        } catch (error) {
            console.error("Sign Up error:", error);
            alert("An error occurred during Sign Up.");
        }
    };

    return (
        <div className="main-container">
            <div className="left-half">
                <h1>ClassTrack</h1>
            </div>

            <div className="right-half">
                <div className="signup-container">
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSignUp}>
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

                        <label htmlFor="firstName">First Name:</label>
                        <input 
                            type="text" 
                            id="firstName" 
                            placeholder="Enter your first name" 
                            value={firstName} 
                            onChange={(e) => setFirstName(e.target.value)} 
                        />

                        <label htmlFor="lastName">Last Name:</label>
                        <input 
                            type="text" 
                            id="lastName" 
                            placeholder="Enter your last name" 
                            value={lastName} 
                            onChange={(e) => setLastName(e.target.value)} 
                        />

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
                        
                        <button type="submit" className="main-button">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
