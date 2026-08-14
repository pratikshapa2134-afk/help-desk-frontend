import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from './services/api';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('userInfo'));
    if (!storedUser) {
      navigate('/'); // जर लॉगिन नसेल तर थेट लॉगिन पेजवर पाठवेल
    } else {
      setUser(storedUser);
      fetchTickets();
    }
  }, [navigate]);

  const fetchTickets = async () => {
    try {
      const res = await API.get('/tickets');
      setTickets(res.data);
    } catch (err) {
      console.error("Error fetching tickets", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  if (!user) return null;

  return (
    <div style={{ padding: '30px', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ margin: 0, color: '#1e293b' }}>Welcome, {user.name} 👋</h1>
          <p style={{ margin: '5px 0 0 0', color: '#64748b' }}>Role: <b>{user.role || 'Customer'}</b></p>
        </div>
        <button 
          onClick={handleLogout}
          style={{ background: '#ef4444', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
        >
          Logout
        </button>
      </div>

      <hr style={{ border: '0', borderTop: '1px solid #e2e8f0', marginBottom: '30px' }} />

      {/* --- SUPER ADMIN DASHBOARD --- */}
      {user.role === 'Super Admin' && (
        <div>
          <h2>👑 Super Admin Control Panel</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', margin: '20px 0' }}>
            <div style={{ background: '#ffffff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#64748b' }}>Total Tickets</h4>
              <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#0f172a' }}>{tickets.length}</p>
            </div>
            <div style={{ background: '#ffffff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#64748b' }}>Open Tickets</h4>
              <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#2563eb' }}>{tickets.filter(t => t.status === 'Open').length}</p>
            </div>
          </div>
        </div>
      )}

      {/* --- SUPPORT AGENT DASHBOARD --- */}
      {user.role === 'Support Agent' && (
        <div>
          <h2>🛠️ Support Agent Workspace</h2>
          <p style={{ color: '#475569' }}>View tickets assigned to your department, reply to customers, and update ticket statuses.</p>
        </div>
      )}

      {/* --- CUSTOMER DASHBOARD --- */}
      {user.role === 'Customer' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>🎫 My Support Tickets</h2>
            <button 
              onClick={() => navigate('/create-ticket')}
              style={{ background: '#2563eb', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
            >
              + Create New Ticket
            </button>
          </div>
          <p style={{ color: '#475569' }}>Track your existing ticket status and view conversation history.</p>
        </div>
      )}
    </div>
  );
}