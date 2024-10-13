import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h2>Admin Dashboard</h2>
        </div>
        <div className="card-body">
          <p>Welcome, Admin! You have access to this page because you have the ADMIN role.</p>
          {/* Add admin-specific content here */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
