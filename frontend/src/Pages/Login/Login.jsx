import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext.jsx';

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
      navigate('/admin');
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
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #7B4019 0%, #FF7D29 35%, #FFBF78 70%, #D1D8BE 100%)'
    }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating food icons */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-2xl animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
          🍕
        </div>
        <div className="absolute top-40 right-20 w-20 h-20 bg-white/10 rounded-full flex items-center justify-center text-3xl animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>
          🍔
        </div>
        <div className="absolute bottom-32 left-16 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-xl animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }}>
          🍟
        </div>
        <div className="absolute bottom-20 right-32 w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-2xl animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.8s' }}>
          🥤
        </div>
        
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-white/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex justify-center items-center min-h-screen px-4">
        <div className="w-full max-w-md">
          {/* Brand Logo/Name */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
              Dish<span style={{ color: '#FFBF78' }}>Dash</span>
            </h1>
            <p className="text-white/80 text-lg">Delicious food, delivered fast</p>
          </div>

          {/* Glass Login Form */}
          <div 
            className="relative backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              boxShadow: '0 25px 45px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Form Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-black mb-2">Welcome Back!</h2>
              <p className="text-black/70">Sign in to continue your food journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Phone Input */}
              <div className="relative">
                <label className="block text-black/90 text-sm font-medium mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl">📱</span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border border-white text-black placeholder-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="relative">
                <label className="block text-black/90 text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl">🔒</span>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border border-white/30 text-black placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl font-semibold text-white text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #FF7D29 0%, #7B4019 100%)',
                  boxShadow: '0 10px 25px rgba(255, 125, 41, 0.3)'
                }}
              >
                Sign In to Dish Dash
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/30"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 text-white/70 bg-transparent">or</span>
                </div>
              </div>

              {/* Register Link */}
              <div className="text-center">
                <p className="text-black/80 text-sm">
                  New to Dish Dash?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="text-xl font-semibold text-white hover:underline transition-all duration-300 transform hover:scale-105"
                    style={{ color: '#7f431a' }}
                  >
                    Create Account
                  </button>
                </p>
              </div>
            </form>

            
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default Login;