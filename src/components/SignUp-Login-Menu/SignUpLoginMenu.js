import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpLoginMenu= () => {

    const navigate = useNavigate();

    return (
        <div className="form-container">
            <button onClick={() => navigate('/signup')}>Sign Up</button>
            <button onClick={() => navigate('/login')}>Login</button>
        </div>
    );
};

export default SignUpLoginMenu;
