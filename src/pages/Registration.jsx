// pages/Registration.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Registration() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', shopName:'' });
  const { setToken, setSeller } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/sellers/register', form);
      // expected { token, seller }
      const { token, seller } = res.data;
      setToken(token);
      setSeller(seller);

      // Navigate to dashboard route — seller id in URL (or just /seller/dashboard)
      navigate(`/seller/dashboard/${seller.id}`, { replace: true });
    } catch (err) {
      console.error('Registration failed', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* fields bound to form */}
      <button type="submit">Register</button>
    </form>
  );
}
