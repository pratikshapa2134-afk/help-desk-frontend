import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/auth/login', { email, password });
      
      // इथे योग्य तो युजर डेटा सेव्ह करत आहोत
      const userData = response.data.user || response.data;
      localStorage.setItem('userInfo', JSON.stringify(userData));
      
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #ff758c 100%)' }}>
      <div style={{ background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.3)', padding: '48px', borderRadius: '20px', width: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: '700', color: '#fff' }}>Welcome Back! 👋</h2>
          <p style={{ margin: 0, fontSize: '14px', color: '#e0e0e0' }}>Please login to your Help Desk account</p>
        </div>

        {error && <div style={{ background: 'rgba(239, 68, 68, 0.8)', color: 'white', padding: '10px', borderRadius: '8px', fontSize: '13px', marginBottom: '20px', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', fontWeight: '500', color: '#fff' }}>Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '12px 16px', background: 'rgba(255, 255, 255, 0.2)', border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: '10px', color: '#fff', outline: 'none' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', fontWeight: '500', color: '#fff' }}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '12px 16px', background: 'rgba(255, 255, 255, 0.2)', border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: '10px', color: '#fff', outline: 'none' }}
            />
          </div>

          <button type="submit" style={{ width: '100%', padding: '14px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '10px', fontWeight: '600', fontSize: '16px', cursor: 'pointer' }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}