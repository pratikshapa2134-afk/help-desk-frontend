import React, { useState } from 'react';
import axios from 'axios';

const CreateTicket = () => {
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    category: '', // You can fetch categories from API later
    priority: 'Medium'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://help-desk-backend-9yu6.onrender.com/api/tickets/create', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Ticket Created Successfully!');
      setFormData({ subject: '', description: '', category: '', priority: 'Medium' });
    } catch (err) {
      alert('Failed to create ticket');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create New Ticket</h3>
      <input type="text" placeholder="Subject" onChange={(e) => setFormData({...formData, subject: e.target.value})} required />
      <textarea placeholder="Description" onChange={(e) => setFormData({...formData, description: e.target.value})} required />
      
      <select onChange={(e) => setFormData({...formData, priority: e.target.value})}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
        <option value="Critical">Critical</option>
      </select>
      
      <button type="submit">Submit Ticket</button>
    </form>
  );
};

export default CreateTicket;