// AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  const checkSession = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/check-session', {
        withCredentials: true,
      });
      const data = response.data;
      if (data.includes('Session active')) {
        const userId = data.split('for user ID: ')[1];
        setUserId(userId);
        setIsAuthenticated(true);
        console.log('Session checked - User authenticated:', userId);
      } else {
        setIsAuthenticated(false);
        setUserId(null);
        console.log('Session checked - User not authenticated');
      }
    } catch (error) {
      console.error('Error checking session:', error);
      setIsAuthenticated(false);
      setUserId(null);
    }
  };

  useEffect(() => {
    checkSession(); // Initial check on mount
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, checkSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);