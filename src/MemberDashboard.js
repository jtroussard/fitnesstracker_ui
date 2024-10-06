import React from 'react';

const MemberDashboard = () => {
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h2>Member Dashboard</h2>
        </div>
        <div className="card-body">
          <p>Welcome, Member! You have access to this page because you have the MEMBER role.</p>
          {/* Add member-specific content here */}
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
