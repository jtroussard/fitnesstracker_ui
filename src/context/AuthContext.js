import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import routes from '../configs/routes';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('jwt'));
  const [userRoles, setUserRoles] = useState([]);
  const [userId, setUserId] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('[AuthContext] AuthProvider mounted');
    const storedJwt = localStorage.getItem('jwt');
    console.log('[AuthContext] Stored JWT:', storedJwt);

    if (storedJwt) {
      try {
        const decodedToken = jwtDecode(storedJwt);
        console.log('[AuthContext] Decoded token on mount:', decodedToken);

        setUserRoles(decodedToken.roles || []);
        setUserId(decodedToken.userId || 0)
      } catch (error) {
        console.error('Error decoding token on mount:', error);
        clearAuthData();
      }
    } else {
      console.warn('No JWT found in local storage.');
    }
  }, []);

  const clearAuthDataWithError = (message) => {
    console.warn('Clearing auth data with message:', message);
    clearAuthData();
    toast.error(message);
    navigate('/auth/login');
  };

  const clearAuthData = () => {
    console.log('[AuthContext] Clearing JWT and roles from local storage');
    localStorage.removeItem('jwt');
    localStorage.removeItem('roles');
    setIsAuthenticated(false);
    setUserRoles([]);
    setUserId(undefined);
    console.log('[AuthContext] Auth data cleared');
  };

  const handleLogout = async () => {
    console.log('[AuthContext] Initiating logout...');
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
        console.log('[AuthContext] Logout successful. Clearing auth data and navigating to home.');
        clearAuthData();
        navigate('/');
      }
    } catch (error) {
      console.error('Logout failed due to a network error:', error);
      toast.error('Logout failed due to a network error. Please try again.');
    }
  };

  const handleLogin = async (credentials) => {
    console.log('[AuthContext] Attempting login with credentials:', credentials);
    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) throw new Error('Login failed');

      const payload = await response.json();
      const data = payload.data;
      console.log('[AuthContext] Login successful, received token:', data.token);
      localStorage.setItem('jwt', data.token);

      const decodedToken = jwtDecode(data.token);
      console.log('[AuthContext] Decoded token:', decodedToken);

      const roles = decodedToken.roles || [];
      console.log('[AuthContext] Roles extracted from token:', roles);

      if (roles.length === 0) {
        console.warn('No roles found in token. Prompting re-login.');
        clearAuthDataWithError("Unable to detect user roles. Please contact support.");
        return { success: false };
      }

      const userId = decodedToken.userId || 0;
      console.log('[AuthContext] User id extracted from token:', userId);

      if (userId === 0) {
        console.warn('No userId found in token. Prompting re-login.');
        clearAuthDataWithError("Unable to detect user id. Please contact support.");
        return { success: false };
      }

      setIsAuthenticated(true);
      setUserRoles(roles);
      setUserId(userId);
      localStorage.setItem('roles', JSON.stringify(roles));
      console.log('[AuthContext] User authenticated. Roles stored in state and local storage:', roles);

      if (roles.includes('ROLE_ADMIN')) {
        console.log('[AuthContext] User is admin. Redirecting to admin dashboard.');
        navigate(routes.admin.find(route => route.name === 'AdminOverview').path);
      } else if (roles.includes('ROLE_MEMBER')) {
        console.log('[AuthContext] User is member. Redirecting to member overview. -> ', routes.member.find(route => route.name === 'MemberOverview').path);
        navigate(routes.member.find(route => route.name === 'MemberOverview').path);
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
    <AuthContext.Provider value={{ isAuthenticated, userRoles, userId, handleLogout, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};