import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    const handleEditProfileClick = () => {
        navigate('/edit-profile');
    };

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <header className="dashboard-header">
            <div className="logo" onClick={() => navigate('/dashboard')}>
                ClassTrack
            </div>
            <div className="profile-section">
                <img 
                    src="/path/to/user-icon.png" 
                    alt="User Profile" 
                    className="profile-icon" 
                    onClick={toggleDropdown} 
                />
                {dropdownOpen && (
                    <div className="dropdown-menu">
                        <button onClick={handleProfileClick}>View Profile</button>
                        <button onClick={handleEditProfileClick}>Edit Profile</button>
                        <button onClick={handleLogout}>Log Out</button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
