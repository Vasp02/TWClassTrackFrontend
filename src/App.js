import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpLoginMenu from './components/SignUp-Login-Menu/SignUpLoginMenu';
import TestPage from './pages/TestPage/TestPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import Dashboard_student from './components/Dashboard/Dashboard_student';
import Dashboard_professor from './components/Dashboard/Dashboard_professor';
import Dashboard_parents from './components/Dashboard/Dashboard_parents'
import ClassPage_professor from './components/ClassPage/ClassPage_professor';
import ClassPage_student from './components/ClassPage/ClassPage_student';
import Create_Classroom from './components/Create_Classroom/Create_Classroom';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';


function App() {
  const userType = localStorage.getItem('userType');

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SignUpLoginMenu />} />

          <Route path="/test" element={<TestPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          <Route path="/dashboard/student" element={<Dashboard_student />} />
          <Route path="/dashboard/professor" element={<Dashboard_professor />} />
          <Route path="/dashboard/parents" element={<Dashboard_parents />} />

          <Route path="/create-classroom" element={<Create_Classroom />} />

          <Route
            path="/class/:id"
            element={
              userType === 'teacher' ? (
                <ClassPage_professor />
              ) : (
                <ClassPage_student />
              )
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
