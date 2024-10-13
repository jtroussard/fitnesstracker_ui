import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Correct import

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component to wrap the app and provide authentication state
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('jwt'));
  const [userRoles, setUserRoles] = useState([]);

  // Load roles from localStorage on component mount
  useEffect(() => {
    const storedRoles = JSON.parse(localStorage.getItem('roles')) || [];
    setUserRoles(storedRoles);
  }, []);

  // Centralized API call for login
  const handleLogin = async (credentials) => {
    console.log(`From AuthContext.js :: invoking handleLogin with ${JSON.stringify(credentials)}`);
    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) throw new Error('Login failed');

      const data = await response.json();
      localStorage.setItem('jwt', data.token);

      const decodedToken = jwtDecode(data.token);
      const userRoles = decodedToken.roles || [];
      localStorage.setItem('roles', JSON.stringify(userRoles));

      setUserRoles(userRoles);
      setIsAuthenticated(true);

      console.log(`From AuthContext.js :: Login successful, roles set to ${JSON.stringify(userRoles)}`);
      return true;
    } catch (error) {
      console.error('From AuthContext.js :: Login failed:', error);
      return false;
    }
  };

  // Centralized API call for logout
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`, // Pass JWT token for server-side logout
        },
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      // Clear the JWT and roles from localStorage
      localStorage.removeItem('jwt');
      localStorage.removeItem('roles');

      // Update authentication state
      setIsAuthenticated(false);
      setUserRoles([]);

      console.log('From AuthContext.js :: Logout successful');
    } catch (error) {
      console.error('From AuthContext.js :: Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRoles, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
