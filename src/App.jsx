import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard'; // तुमचे डॅशबोर्ड असेल तर
import CreateTicket from './CreateTicket'; // तुमचे तिकीट पेज असेल तर

function App() {
  return (
    <Router>
      <Routes>
        {/* Set Login page as the default home page */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-ticket" element={<CreateTicket />} />
      </Routes>
    </Router>
  );
}

export default App;