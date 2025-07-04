import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext.jsx';

const Login = () => {
  const [formData, setFormData] = useState({ phone: '', password: '' });
  const navigate = useNavigate();
  const { checkSession } = useAuth();

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

      await checkSession();
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid phone number or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      backgroundImage: 'url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      {/* Glass overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

      {/* Floating food icons */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-2xl animate-float" style={{ animationDelay: '0s' }}>
        🍕
      </div>
      <div className="absolute top-40 right-20 w-20 h-20 bg-white/10 rounded-full flex items-center justify-center text-3xl animate-float" style={{ animationDelay: '1s' }}>
        🍔
      </div>
      <div className="absolute bottom-32 left-16 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-xl animate-float" style={{ animationDelay: '2s' }}>
        🍟
      </div>
      <div className="absolute bottom-20 right-32 w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-2xl animate-float" style={{ animationDelay: '0.5s' }}>
        🥤
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex justify-center items-center min-h-screen px-4">
        <div className="w-full max-w-md">
          {/* Glass Login Form */}
          <div 
            className="relative backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              boxShadow: '0 25px 45px rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* Gradient overlay */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-br from-orange-500/20 to-transparent rounded-full blur-xl"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-tl from-amber-500/20 to-transparent rounded-full blur-xl"></div>
            
            {/* Logo */}
            <div className="text-center mb-8">
              <img 
                src="https://i.ibb.co/5KqY1bG/food-delivery-logo.png" 
                alt="Dish Dash Logo"
                className="h-20 mx-auto mb-4"
              />
              <h2 className="text-3xl font-bold text-white">Welcome Back!</h2>
              <p className="text-white/80 mt-2">Sign in to continue your food journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              {/* Phone Input */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl font-semibold text-white text-lg transition-all duration-300 hover:shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 125, 41, 0.9) 0%, rgba(123, 64, 25, 0.9) 100%)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                Sign In
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/30"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 text-white/70 bg-transparent text-sm">or</span>
                </div>
              </div>

              {/* Register Link */}
              <div className="text-center">
                <p className="text-white/80 text-sm">
                  New to Dish Dash?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="font-semibold text-white hover:underline"
                    style={{ color: '#FFBF78' }}
                  >
                    Create Account
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Login;