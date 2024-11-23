import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode'; // Fixed to avoid removing your imports

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('jwt'));
  const [userRoles, setUserRoles] = useState([]);
  const [userId, setUserId] = useState(null); // Added userId state
  const navigate = useNavigate();

  useEffect(() => {
    console.log('AuthProvider mounted');
    const storedJwt = localStorage.getItem('jwt');
    console.log('Stored JWT:', storedJwt);

    if (storedJwt) {
      try {
        const decodedToken = jwtDecode(storedJwt); // Decode the token from localStorage
        console.log('Decoded token on mount:', decodedToken);

        setUserId(decodedToken.userId); // Extract and set userId
        setUserRoles(decodedToken.roles || []); // Extract roles
      } catch (error) {
        console.error('Error decoding token on mount:', error);
        clearAuthData(); // Clear any invalid data
      }
    } else {
      console.warn('No JWT found in local storage.');
    }
  }, []);

  // Clears auth data and redirects to login with error message
  const clearAuthDataWithError = (message) => {
    console.warn('Clearing auth data with message:', message);
    clearAuthData();
    toast.error(message);
    navigate('/auth/login');
  };

  const clearAuthData = () => {
    console.log('Clearing JWT and roles from local storage');
    localStorage.removeItem('jwt');
    localStorage.removeItem('roles');
    setIsAuthenticated(false);
    setUserId(null); // Reset userId
    setUserRoles([]);
    console.log('Auth data cleared');
  };

  const handleLogout = async () => {
    console.log('Initiating logout...');
    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      });

      if (!response.ok) {
        console.warn('Logout response not OK. Clearing auth data.');
        clearAuthDataWithError("You've been logged out.");
      } else {
        console.log('Logout successful. Clearing auth data and navigating to home.');
        clearAuthData();
        navigate('/');
      }
    } catch (error) {
      console.error('Logout failed due to a network error:', error);
      toast.error('Logout failed due to a network error. Please try again.');
    }
  };

  const handleLogin = async (credentials) => {
    console.log('Attempting login with credentials:', credentials);
    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) throw new Error('Login failed');

      const payload = await response.json();
      const data = payload.data;
      console.log('Login successful, received token:', data.token);
      localStorage.setItem('jwt', data.token);

      const decodedToken = jwtDecode(data.token);
      console.log('Decoded token:', decodedToken);

      const roles = decodedToken.roles || [];
      console.log('Roles extracted from token:', roles);

      if (roles.length === 0) {
        console.warn('No roles found in token. Prompting re-login.');
        clearAuthDataWithError("Unable to detect user roles. Please contact support.");
        return { success: false };
      }

      setIsAuthenticated(true);
      setUserId(decodedToken.userId); // Set userId from token
      setUserRoles(roles);
      localStorage.setItem('roles', JSON.stringify(roles));
      console.log('User authenticated. Roles stored in state and local storage:', roles);

      // Redirect based on role
      if (roles.includes('ROLE_ADMIN')) {
        console.log('User is admin. Redirecting to admin dashboard.');
        navigate('/boards/admin/overview');
      } else if (roles.includes('ROLE_MEMBER')) {
        console.log('User is member. Redirecting to member overview.');
        navigate('/boards/members/overview');
      } else {
        console.warn('Unknown role detected. Prompting re-login.');
        clearAuthDataWithError("Unknown role. Please contact support.");
      }

      return { success: true };
    } catch (error) {
      console.error('Login failed:', error.message);
      toast.error('Login failed. Please check your credentials and try again.');
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, userRoles, handleLogout, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
