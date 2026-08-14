import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function Dashboard() {
  const [user, setUser] = useState({ name: '', role: '' });
  const [stats, setStats] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    
    if (!storedUser) {
      navigate('/');
    } else {
      try {
        const parsedUser = JSON.parse(storedUser);
        // बॅकएंडवरून येणारा फ्लॅट डेटा किंवा युजर ऑब्जेक्ट दोन्ही अचूकपणे सेट करेल
        setUser({
          name: parsedUser.name || 'User',
          role: parsedUser.role || 'Customer'
        });
        fetchStats();
      } catch (err) {
        console.error("Error parsing user info", err);
        navigate('/');
      }
    }
  }, [navigate]);

  const fetchStats = async () => {
    try {
      const res = await API.get('/tickets/dashboard-stats');
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching stats", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Segoe UI, sans-serif', background: '#f1f5f9', minHeight: '100vh' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '20px 30px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <div>
          <h1 style={{ margin: 0, color: '#1e293b' }}>Welcome, {user.name} 👋</h1>
          <p style={{ margin: '5px 0 0 0', color: '#64748b' }}>Role: <b>{user.role}</b></p>
        </div>
        <button onClick={handleLogout} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
          Logout
        </button>
      </div>

      {/* Dashboard Analytics Widgets */}
      <div style={{ marginTop: '30px' }}>
        <h2>Dashboard Overview</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3>Total Tickets</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6' }}>{stats.totalTickets || 0}</p>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3>Open Tickets</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#eab308' }}>{stats.openTickets || 0}</p>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3>In Progress</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#6366f1' }}>{stats.inProgress || 0}</p>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3>Critical Tickets</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#ef4444' }}>{stats.critical || 0}</p>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3>Resolved Tickets</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#22c55e' }}>{stats.resolved || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
