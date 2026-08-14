import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (!storedUser) {
      navigate('/');
    } else {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Error parsing user info", err);
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  if (!user) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '20px 30px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <div>
          <h1 style={{ margin: 0, color: '#1e293b' }}>Welcome, {user.name || 'User'}! 🎉</h1>
          <p style={{ margin: '5px 0 0 0', color: '#64748b' }}>Role: <b>{user.role || 'Customer'}</b></p>
        </div>
        <button 
          onClick={handleLogout}
          style={{ background: '#ef4444', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
        >
          Logout
        </button>
      </div>
      
      <div style={{ marginTop: '30px', background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h2>Dashboard Overview</h2>
        <p>You have successfully logged into the Help Desk System.</p>
      </div>
    </div>
  );
}