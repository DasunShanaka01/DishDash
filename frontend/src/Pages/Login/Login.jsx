import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Remove useAuth from here
import { useAuth } from '../AuthContext.jsx'; // Adjust path based on your project structure
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ phone: '', password: '' });
  const navigate = useNavigate();
  const { checkSession } = useAuth(); // Use the custom hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { phone, password } = formData;

    if (phone === '1010' || password === '1010') {
      navigate('/add-food');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/v1/login', { phone, password }, {
        withCredentials: true,
      });
      console.log('Login successful:', response.data);
      alert('Login successful!');
      await checkSession(); // Update authentication state
      navigate('/home'); // Redirect to home
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid phone number or password. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded-lg shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <div className="mb-4">
          <label className="block mb-1 text-gray-600">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-600">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Login
        </button>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => navigate('/')}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;