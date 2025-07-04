import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import webLOgo from '../../assets/DisDashLogo.jpg'; // Adjust the path as necessary

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, phone, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/v1/reg', {
        firstName,
        lastName,
        phone,
        password,
      });
      console.log('User registered successfully:', response.data);      
      navigate('/Login');
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div 
      className="flex justify-center items-center min-h-screen"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div 
        className="relative w-full max-w-md mx-4"
        style={{
          backdropFilter: 'blur(16px)',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          overflow: 'hidden',
        }}
      >
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 191, 120, 0.3) 0%, rgba(209, 216, 190, 0.3) 100%)',
            zIndex: '-1',
          }}
        />
        
        <form
          className="p-8"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-center mb-8">
            <img 
              src={webLOgo}
              alt="Dish Dash Logo"
              className="h-16"
            />
          </div>
          
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: '#7B4019' }}>
            Create Account
          </h2>
          
          <div className="space-y-6">
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block mb-2 text-sm font-medium" style={{ color: '#7B4019' }}>
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-70 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  style={{ backdropFilter: 'blur(5px)' }}
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block mb-2 text-sm font-medium" style={{ color: '#7B4019' }}>
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-70 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  style={{ backdropFilter: 'blur(5px)' }}
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium" style={{ color: '#7B4019' }}>
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-70 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                style={{ backdropFilter: 'blur(5px)' }}
                required
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium" style={{ color: '#7B4019' }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-70 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                style={{ backdropFilter: 'blur(5px)' }}
                required
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium" style={{ color: '#7B4019' }}>
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-70 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                style={{ backdropFilter: 'blur(5px)' }}
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #FF7D29 0%, #FFBF78 100%)',
              }}
            >
              Register
            </button>
          </div>
          
          <p className="mt-6 text-center text-sm" style={{ color: '#7B4019' }}>
            Already have an account?{' '}
            <button 
              type="button"
              onClick={() => navigate('/Login')}
              className="font-semibold hover:underline"
              style={{ color: '#FF7D29' }}
            >
              Sign in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;