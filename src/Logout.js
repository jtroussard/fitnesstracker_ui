import React from 'react';

const Logout = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`, // Pass JWT token
        },
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      localStorage.removeItem('jwt'); // Clear JWT token
      alert('Logged out successfully!');
      onLogout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button className="btn btn-danger" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
