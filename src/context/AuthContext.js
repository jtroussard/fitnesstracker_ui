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
    // TODO discovered an edge case here, where the role is undefined it actually blows up the whole app
    // Uncaught SyntaxError: "undefined" is not valid JSON
    // at JSON.parse (<anonymous>)
    // at AuthContext.js:14:1
    // We should handle this error. Probably blast out the localstorage auth stuff and redirect to the login
    const storedRoles = JSON.parse(localStorage.getItem('roles')) || [];
    setUserRoles(storedRoles);
  }, []);

  // Helper function to clear authentication data
  const clearAuthData = () => {
    console.log('AuthContext: Clearing Auth data.')
    localStorage.removeItem('jwt');
    localStorage.removeItem('roles');
    setIsAuthenticated(false);
    setUserRoles([]);
    console.log('AuthContext: Auth data cleared.');
  };

  const clearAndRedirect = () => {
    console.log('AuthContent :: Invoking clear then redirecting.')
    clearAuthData();
    navigate('/auth/login');
  }

  // TODO consider returning { success: false } in the event of logout failure.
  const handleLogout = async () => {
    console.log('AuthContext: handleLogout called');
    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      });

      if (!response.ok) {
        // TODO Keeping this code here for now because the error loops during development which is annoying.
        // Research what is a good workflow for logging out.
        // throw new Error('Logout failed');
        console.warn('AuthContext :: Token may have expired or the user is not authorized to access this endpoint.');
        clearAndRedirect();
      } else if (response.status === 403) {
        console.warn('AuthContext :: Token may have expired or the user is not authorized to access this endpoint.');
        toast.warn('Session expired. Please log in again.');
        clearAndRedirect();
      } else {
        console.log('AuthContext :: Logout successful');
        clearAndRedirect();
      }
    } catch (error) {
      console.error('AuthContext :: Logout failed', error);
      if (error.message === 'Failed to fetch') {
        toast.error('Network error. Retrying logout, please allow for 3 seconds...');
        setTimeout(handleLogout, 3000);
      } else {
        toast.error('Logout failed. Please try again later.');
      }
    }
  };

  // Centralized login logic
  const handleLogin = async (credentials) => {
    console.log('AuthContext: handleLogin called');
    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) throw new Error('Login failed');

      const data = await response.json();
      // Set token
      localStorage.setItem('jwt', data.token);
      // // Set roles
      const decodedToken = jwtDecode(data.token);
      const userRoles = decodedToken.roles || [];
      // Set state
      setIsAuthenticated(true);
      setUserRoles(data.roles);
      console.log('AuthContext: Login successful');

      // Role-based navigation handled here
      if (userRoles.includes('ROLE_ADMIN')) {
        localStorage.setItem('roles', JSON.stringify(userRoles));
        navigate('/boards/admin');
      } else if (userRoles.includes('ROLE_MEMBER')) {
        localStorage.setItem('roles', JSON.stringify(userRoles));
        navigate('/boards/members');
      } else {
        /*
        * TODO Not sure this flow is correct. Should not ever have no roles.
        So the redirect makes sense but we should either consider this an
        error or maybe throw a toast saying try again? Need to consider within 
        the context fo the workflow what it would be to reach this line of code.
        */
        navigate('/auth/login');
      }

      return { success: true };
    } catch (error) {
      console.error('AuthContext: Login failed', error);
      toast.error('Login failed. Please check your credentials.');
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRoles, handleLogout, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
