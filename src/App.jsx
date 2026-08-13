import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateTicket from './components/CreateTicket'; // याची खात्री करा की ही फाइल त्या फोल्डरमध्ये आहे

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav style={{ padding: '10px', background: '#f4f4f4', marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
          <Link to="/create-ticket">Create New Ticket</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<h1>Welcome to Help Desk System 🛠️</h1>} />
          <Route path="/create-ticket" element={<CreateTicket />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;