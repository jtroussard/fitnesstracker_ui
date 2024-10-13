import React from 'react';
import Logout from '../auth/Logout'; // Import the Logout component

const AdminDashboard = ({ onLogout }) => {
  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      {/* Admin dashboard content */}
      <p>Welcome, Admin! Here you can manage the application and view admin-specific content.</p>
      {/* Render the Logout button and pass the onLogout prop */}
      <Logout onLogout={onLogout} />
    </div>
  );
};

export default AdminDashboard;
