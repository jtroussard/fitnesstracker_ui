import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

// Create AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('jwt'));
  const [userRoles, setUserRoles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRoles = JSON.parse(localStorage.getItem('roles')) || [];
    if (storedRoles.length === 0) {
      clearAuthDataWithError("Invalid or missing roles. Please log in again.");
    } else {
      setUserRoles(storedRoles);
    }
  }, []);

  // Helper function to clear authentication data and handle errors
  const clearAuthDataWithError = (message) => {
    clearAuthData();
    toast.error(message);
    navigate('/auth/login');
  };

  const clearAuthData = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('roles');
    setIsAuthenticated(false);
    setUserRoles([]);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      });

      if (!response.ok) {
        clearAuthDataWithError("Logout failed. Please try again.");
      } else {
        clearAuthData();
        navigate('/');
      }
    } catch (error) {
      toast.error('Logout failed due to a network error. Please try again.');
    }
  };

  const handleLogin = async (credentials) => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) throw new Error('Login failed');

      const data = await response.json();
      localStorage.setItem('jwt', data.token);
      const decodedToken = jwtDecode(data.token);
      const roles = decodedToken.roles || [];

      if (roles.length === 0) {
        clearAuthDataWithError("Unable to detect user roles. Please contact support.");
        return { success: false };
      }

      setIsAuthenticated(true);
      setUserRoles(roles);
      localStorage.setItem('roles', JSON.stringify(roles));

      // Redirect based on role
      if (roles.includes('ROLE_ADMIN')) {
        navigate('/boards/admin');
      } else if (roles.includes('ROLE_MEMBER')) {
        navigate('/boards/members');
      } else {
        clearAuthDataWithError("Unknown role. Please contact support.");
      }

      return { success: true };
    } catch (error) {
      toast.error('Login failed. Please check your credentials and try again.');
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRoles, handleLogout, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
