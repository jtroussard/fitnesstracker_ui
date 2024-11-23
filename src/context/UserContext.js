import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { userId, isAuthenticated } = useContext(AuthContext); // Access userId and isAuthenticated
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log('FUCKKKKKKKKKKKKKKKUserProvider useEffect triggered'); // Debugging comment
    if (userId && isAuthenticated) {
      console.log('Fetching user data for ID:', userId);
      fetch(`http://localhost:8080/api/v1/member/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`, // Using token from localStorage
        },
      })
        .then((response) => {
          console.log('API response status:', response.status);
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Fetched user data:', data);
          setUser(data.data); // Set user data based on API response shape
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          setUser(null);
        });
    } else {
      console.log('No userId or isAuthenticated, skipping fetch');
      setUser(null); // Reset user state when userId or isAuthenticated changes
    }
  }, [userId, isAuthenticated]); // Dependent on userId and isAuthenticated

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
