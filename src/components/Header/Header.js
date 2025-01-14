import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ userData }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        navigate('/');
    };

    const displayName = (() => {
        const userType = userData?.usertype?.toLowerCase();
        const name = userData?.firstName || 'Unknown';

        if (userType === 'teacher') {
            return `Professor: ${name}`;
        } else if (userType === 'student') {
            return `Student: ${name}`;
        } else {
            return name || 'User';
        }
    })();

    return (
        <header className="dashboard-header">
            <div className="logo" >
                ClassTrack
            </div>

            <div className="profile-section">
                <div className="profile-name" onClick={toggleDropdown}>
                    {displayName}
                </div>
                {dropdownOpen && (
                    <div className="dropdown-menu">
                        <button onClick={handleLogout}>Log Out</button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
