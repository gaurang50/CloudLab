import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Auth from './components/Auth'; // Ensure this import path matches your project structure
import HomePage from './components/HomePage'; // Ensure this import path matches your project structure
import SignUp from './components/SignUp'; // Ensure this import path matches your project structure

function App() {
  // Assuming you have authentication logic here
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Auth setCurrentUser={setCurrentUser} />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Pass currentUser to HomePage, note this path must align with your 'Home' button link */}
        <Route path="/home" element={<HomePage currentUser={currentUser} />} />
        <Route path="/about" element={<HomePage currentUser={currentUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
