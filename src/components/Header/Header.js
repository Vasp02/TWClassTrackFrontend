import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ userData }) => {
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
        localStorage.removeItem('jwtToken'); // Clear the token
        navigate('/login');
    };

    // Determine role and display name
    const displayName = (() => {
    const userType = userData?.usertype?.toLowerCase(); // Normalize userType to lowercase
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
            <div className="logo" onClick={() => navigate('/dashboard')}>
                ClassTrack
            </div>
            <div className="profile-section">
                <div className="profile-name" onClick={toggleDropdown}>
                    {displayName} {/* Display user's role and first name */}
                </div>
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
