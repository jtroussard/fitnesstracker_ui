import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';  // The correct import as per our design
import { toast } from 'react-toastify';

// Create AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('jwt'));
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    const storedRoles = JSON.parse(localStorage.getItem('roles')) || [];
    setUserRoles(storedRoles);
  }, []);

  // Centralized login logic - NO RETURN VALUE
  const handleLogin = async (credentials) => {
    console.log('AuthContext: handleLogin called');
    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        toast.error('Login failed. Please check your credentials and try again.');
        throw new Error('Login failed');
      } 

      const data = await response.json();
      localStorage.setItem('jwt', data.token);

      const decodedToken = jwtDecode(data.token);
      const userRoles = decodedToken.roles || [];
      localStorage.setItem('roles', JSON.stringify(userRoles));

      setIsAuthenticated(true);
      setUserRoles(userRoles);
      console.log('AuthContext: Login successful');
    } catch (error) {
      console.error('AuthContext: Login failed', error);
    }
  };

  // Centralized logout logic - NO RETURN VALUE
  const handleLogout = async () => {
    console.log('AuthContext: handleLogout called');
    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      });

      if (!response.ok) throw new Error('Logout failed');

      localStorage.removeItem('jwt');
      localStorage.removeItem('roles');

      setIsAuthenticated(false);
      setUserRoles([]);
      console.log('AuthContext: Logout successful');
    } catch (error) {
      console.error('AuthContext: Logout failed', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRoles, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
