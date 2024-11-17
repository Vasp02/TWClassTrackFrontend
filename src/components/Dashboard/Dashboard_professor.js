// import React, { useState, useEffect } from 'react';
// import './Dashboard_professor.css';
// import Header from '../Header/Header';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function Dashboard_professor() {
//     const [userData, setUserData] = useState(null);
//     const [classes, setClasses] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const token = localStorage.getItem('jwtToken');
//         if (token) {
//             axios
//                 .get('http://localhost:8080/api/professors/token/validate', {
//                     headers: { Authorization: `Bearer ${token}` },
//                 })
//                 .then((response) => {
//                     if (response.status === 200 && response.data) {
//                         console.log('Professor Data:', response.data); // Debug log
//                         setUserData(response.data);
//                     }
//                 })
//                 .catch((error) => {
//                     console.error('Token validation failed:', error);
//                 });
//         }
//     }, []);
    

//     const fetchClasses = async () => {
//         const token = localStorage.getItem('jwtToken');
//         try {
//             const response = await axios.get('http://localhost:8080/api/classrooms', {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             setClasses(response.data.filter(classItem => classItem.professor.id === userData.id));
//         } catch (error) {
//             console.error("Error fetching classes:", error);
//         }
//     };

//     const handleClassClick = (classId) => {
//         navigate(`/class/${classId}`);
//     };

//     return (
//         <div className="dashboard-container">
//             <Header userData={userData} />
//             <div className="content">
//                 <aside className="sidebar">
//                     <h3>My Classes</h3>
//                     <ul className="class-list">
//                         {classes.map((classItem) => (
//                             <li key={classItem.id} onClick={() => handleClassClick(classItem.id)}>
//                                 {classItem.title}
//                             </li>
//                         ))}
//                     </ul>
//                 </aside>
//                 <main className="class-cards">
//                     {classes.map((classItem) => (
//                         <div className="class-card" key={classItem.id} onClick={() => handleClassClick(classItem.id)}>
//                             <h4>{classItem.title}</h4>
//                             <p>Students Enrolled: {classItem.studentList.length}</p>
//                         </div>
//                     ))}
//                 </main>
//             </div>
//         </div>
//     );
// }
import React, { useState, useEffect } from 'react';
import './Dashboard_professor.css';
import Header from '../Header/Header';
import { FaChalkboardTeacher } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard_professor() {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("useEffect running for professor dashboard");

        const token = localStorage.getItem('jwtToken');
        console.log("Retrieved token:", token);

        if (token) {
            axios.get('http://localhost:8080/api/professors/token/validate', {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                console.log("response", response);

                if (response.status === 200 && response.data) {
                    setUserData(response.data); // Store professor info in state
                    console.log("Professor data:", response.data);
                }
            })
            .catch(error => {
                console.error("Token validation failed:", error);
            });
        }
    }, []);

    const classes = [
        { id: 1, title: '2024/25 - Advanced Mathematics', studentsEnrolled: 25, nextEvent: 'Quiz: Tomorrow' },
        { id: 2, title: 'Physics 101', studentsEnrolled: 30, nextEvent: 'Lab demo: Friday' },
        { id: 3, title: 'Chemistry', studentsEnrolled: 20, nextEvent: 'Assignment review: Next Monday' },
    ];

    const handleClassClick = (classId) => {
        navigate(`/class/${classId}`);
    };

    const handleCreateClassroom = () => {
        navigate('/create-classroom'); // Navigate to the classroom creation page
    };

    return (
        <div className="dashboard-container">
            <Header userData={userData} />

            <div className="content">
                <aside className="sidebar">
                    <h3>My Classes</h3>
                    <button className="create-classroom-button" onClick={handleCreateClassroom}>
                        Create Classroom
                    </button>
                    <ul className="class-list">
                        {classes.map((classItem) => (
                            <li key={classItem.id} onClick={() => handleClassClick(classItem.id)}>
                                <FaChalkboardTeacher className="class-icon" />
                                {classItem.title}
                            </li>
                        ))}
                    </ul>
                </aside>
                
                <div className="class-cards-container">
                    <main className="class-cards">
                        {classes.map((classItem) => (
                            <div className="class-card" key={classItem.id} onClick={() => handleClassClick(classItem.id)}>
                                <h4>{classItem.title}</h4>
                                <p>Students Enrolled: {classItem.studentsEnrolled}</p>
                                <p className="next-event">{classItem.nextEvent}</p>
                            </div>
                        ))}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default Dashboard_professor;


