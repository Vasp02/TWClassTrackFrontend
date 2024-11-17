import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import TestPage from './pages/TestPage/TestPage';
import Login from './pages/LoginPage/LoginPage';
import Dashboard_student from './components/Dashboard/Dashboard_student';
import Dashboard_professor from './components/Dashboard/Dashboard_professor';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpLoginMenu from './components/SignUp-Login-Menu/SignUpLoginMenu';
import ClassPage_professor from './components/ClassPage/ClassPage_student';
import ClassPage_student from './components/ClassPage/ClassPage_student';
import Create_Classroom from './components/Create_Classroom/Create_Classroom';

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
          <Route path="/create-classroom" element={<Create_Classroom />} />
          <Route 
              path="/class/:id" 
              element={userType === 'professor' ? <ClassPage_professor /> : <ClassPage_student />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
