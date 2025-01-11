import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const StudentManagePage = () => {
    const { cid, sid } = useParams();
    const [studentData, setStudentData] = useState(null);
    const [classroomData, setClassroomData] = useState(null);

    useEffect(() => {

        fetchStudentData();
        fetchClassroomData();
    }, [cid, sid]);

    const fetchStudentData = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/students/id/${sid}`
            );
            setStudentData(response.data);
        } catch (error) {
            console.error("Error fetching student data:", error);
        }
    };

    const fetchClassroomData = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/classrooms/${cid}`
            );
            setClassroomData(response.data);
        } catch (error) {
            console.error("Error fetching classroom data:", error);
        }
    };

    if (!studentData) {
        return <p>Loading student data...</p>;
    }

    return (
        <>
        <div>
            <h3>Student Manage Page</h3>
            <h4> Student : {studentData.firstName} {studentData.lastName}</h4>
            <p> Classroom : {classroomData.name}</p>
        </div>
        <div className='manager-div'>
            <div className='attendance-manager-div'></div>
            <div className='grades-manager-div'></div>
        </div>
        </>
        
    );
};

export default StudentManagePage;



//  ________________
//  attendace | +   |
//  _________________
//  12/02/2025  prezent -
//  13/02/2025 abs
