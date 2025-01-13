import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./StudentManagePage.css";
import Header from "../../components/Header/Header";

const StudentManagePage = () => {
  const { cid, sid } = useParams();
  const [studentData, setStudentData] = useState(null);
  const [classroomData, setClassroomData] = useState(null);
  const [attendanceList, setAttendanceList] = useState([]);
  const [gradesList, setGradesList] = useState([]);
  const [newDate, setNewDate] = useState(null);
  const [newAttendanceStatus, setNewAttendanceStatus] = useState("present");
  const [newGradeDate, setNewGradeDate] = useState(null);
  const [newGrade, setNewGrade] = useState({
    title: "",
    grade: "",
    studentId: sid,
    classroomId: cid,
  });

  useEffect(() => {
    fetchStudentData();
    fetchClassroomData();
    fetchAttendanceData();
    fetchGradesData();
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
      const response = await axios.get(`http://localhost:8080/api/classrooms/${cid}`);
      const classroomData = response.data;
  
      let parsedName = classroomData.name;
      try {
        const parsed = JSON.parse(classroomData.name);
        if (parsed && parsed.name) {
          parsedName = parsed.name;
        }
      } catch (error) {
        console.warn("Failed to parse classroom name, using raw name:", classroomData.name);
      }
  
      setClassroomData({ ...classroomData, name: parsedName });
    } catch (error) {
      console.error("Error fetching classroom data:", error);
    }
  };
  

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/attendances/student/${sid}/classroom/${cid}`
      );
      console.log("Fetched attendance:", response.data);
  
      const normalizedData = response.data.map((entry) => ({
        ...entry,
        status: entry.isPresent ? "present" : "absent",
      }));
  
      setAttendanceList(normalizedData);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };
  

  const fetchGradesData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/assignments/student/${sid}/classroom/${cid}`
      );
      setGradesList(response.data);
    } catch (error) {
      console.error("Error fetching grades data:", error);
    }
  };

  const calculateAverageGrade = () => {
    if (gradesList.length === 0) return 0;
    const total = gradesList.reduce((sum, grade) => sum + grade.grade, 0);
    return (total / gradesList.length).toFixed(2);
  };

  const calculateAttendancePercentage = () => {
    if (attendanceList.length === 0) return "0%";
    const presentCount = attendanceList.filter((entry) => entry.status === "present").length;
    return ((presentCount / attendanceList.length) * 100).toFixed(2) + "%";
  };


  const handleAddAttendance = () => {
    if (!newDate) return;
  
    const formattedDate = new Date(newDate.getTime() - newDate.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];
  
    const newEntry = {
      date: formattedDate,
      status: newAttendanceStatus,
      studentId: sid,
      classroomId: cid,
    };

    console.log("new entry",newEntry)
  
    const token = localStorage.getItem("jwtToken");
  
    axios
      .post(`http://localhost:8080/api/attendances`, newEntry, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Attendance added successfully:", response.data);
        fetchAttendanceData();
        setNewDate(null);
        setNewAttendanceStatus("present");
      })
      .catch((error) => {
        console.error("Error adding attendance:", error);
      });
  };
  
  
  

  const handleRemoveAttendance = (id) => {


    const token = localStorage.getItem("jwtToken");

    axios
        .delete(`http://localhost:8080/api/attendances/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(() => {
            console.log("Attendance removed successfully.");
            setAttendanceList((prev) => prev.filter((entry) => entry.id !== id));
        })
        .catch((error) => {
            console.error("Error removing attendance:", error);
        });
  };

  const handleAttendanceStatusChange = (index, status) => {
    const updatedList = [...attendanceList];
    updatedList[index].status = status;
    setAttendanceList(updatedList);

    axios
      .put(`http://localhost:8080/api/attendance/${cid}/${sid}`, updatedList[index])
      .catch((error) => {
        console.error("Error updating attendance status:", error);
      });
  };

  const handleAddGrade = () => {
    if (!newGrade.grade || !newGrade.studentId || !newGrade.classroomId || !newGradeDate) {
      console.error("Missing required fields:", newGrade);
      return;
    }

    const formattedDate = new Date(
      newGradeDate.getTime() - newGradeDate.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];

    const newEntry = {
      name: newGrade.title,
      date: formattedDate,
      grade: parseFloat(newGrade.grade),
      studentId: newGrade.studentId,
      classroomId: newGrade.classroomId,
    };

    const token = localStorage.getItem("jwtToken");

    axios
      .post(`http://localhost:8080/api/assignments`, newEntry, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setNewGrade({
          title: "",
          grade: "",
          studentId: sid,
          classroomId: cid,
        });
        setNewGradeDate(null);
        fetchGradesData();
      })
      .catch((error) => {
        console.error("Error adding grade:", error);
      });
  };

  const handleRemoveGrade = (id) => {
    const token = localStorage.getItem("jwtToken");
    axios
      .delete(`http://localhost:8080/api/assignments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        fetchGradesData();
      })
      .catch((error) => {
        console.error("Error deleting assignment:", error);
      });
  };

  const handleGradeInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setNewGrade({ ...newGrade, grade: value });
    }
  };

  if (!studentData || !classroomData) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <Header userData={{ firstName: "Professor" }} />
  
      <div className="student-manage-container">
        <div className="student-header">
          <h2>Manage Student</h2>
          <h3>
            Student: {studentData.firstName} {studentData.lastName}
          </h3>
          <p>Classroom: {classroomData.name}</p>
        </div>
  
        <div className="attendance-manager">
          <h3>Attendance</h3>
          <div className="attendance-header">
            <DatePicker
              selected={newDate}
              onChange={(date) => setNewDate(date)}
              placeholderText="Select a date"
              className="date-picker"
            />
            <select
              value={newAttendanceStatus}
              onChange={(e) => setNewAttendanceStatus(e.target.value)}
              className="status-select"
            >
              <option value="present">Present</option>
              <option value="absent">Absent</option>
            </select>
            <button className="add-date-button" onClick={handleAddAttendance}>
              +
            </button>
          </div>
          <ul className="attendance-list">
  {attendanceList.map((entry, index) => (
    <li key={index} className="attendance-item">
      <span>{entry.date}</span>
      <span>{entry.present === true || entry.present === "present" ? "Present" : "Absent"}</span>
      <button
        className="remove-button"
        onClick={() => handleRemoveAttendance(entry.id)}
      >
        Remove
      </button>
    </li>
  ))}
</ul>



        </div>
  
        <div className="grades-manager">
          <h3>Grades</h3>
          <div className="grades-header">
            <input
              type="text"
              placeholder="Enter title"
              value={newGrade.title}
              onChange={(e) => setNewGrade({ ...newGrade, title: e.target.value })}
              className="grade-title-input"
            />
            <input
              type="text"
              placeholder="Enter grade"
              value={newGrade.grade}
              onChange={handleGradeInputChange}
              className="grade-input"
            />
            <DatePicker
              selected={newGradeDate}
              onChange={(date) => setNewGradeDate(date)}
              placeholderText="Select a date"
              className="date-picker"
            />
            <button className="add-grade-button" onClick={handleAddGrade}>
              Confirm
            </button>
          </div>
          <ul className="grades-list">
            {gradesList.map((entry, index) => (
              <li key={index} className="grades-item">
                <span>{entry.name}</span>
                <span>{entry.date}</span>
                <span>{entry.grade}</span>
                <button
                  className="remove-button"
                  onClick={() => handleRemoveGrade(entry.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="overall-results">
          <h3>Overall Results</h3>
          <div className="result-box">
            <p><strong>Average Grade:</strong> {calculateAverageGrade()}</p>
            <p><strong>Attendance Percentage:</strong> {calculateAttendancePercentage()}</p>
          </div>
        </div>

      </div>
    </>
  );
  
};

export default StudentManagePage;
