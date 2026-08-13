import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Fetch stats from your Render backend
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming you store token here
        const res = await axios.get('https://help-desk-backend-9yu6.onrender.com/api/dashboard/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h2>My Dashboard</h2>
      {stats ? (
        <div>
          <p>Total Tickets: {stats.myTickets}</p>
          <p>Open Tickets: {stats.openTickets}</p>
        </div>
      ) : <p>Loading...</p>}
    </div>
  );
};

export default Dashboard;