import React from 'react';

const Logout = ({ onLogout }) => {
  const handleLogout = () => {
    // Delegate the logout process to App.js via the onLogout prop
    onLogout();
  };

  return (
    <button className="btn btn-danger" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
