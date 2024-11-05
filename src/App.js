import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import TestPage from './pages/TestPage/TestPage';
import UserSelection from './components/UserSelection/UserSelection';
import Login from './pages/LoginPage/LoginPage';
import Dashboard from './components/Dashboard/Dashboard'; // Import the new Dashboard component
import SignUpPage from './pages/SignUpPage/SignUpPage';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<UserSelection />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* New Dashboard route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
