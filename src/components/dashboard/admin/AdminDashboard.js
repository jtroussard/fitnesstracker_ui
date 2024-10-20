import React from 'react';
import SideNav from '../common/SideNav';
import MainContent from '../common/MainContent';

const AdminDashboard = ({ onLogout, user }) => {
  const navItems = [
    { label: 'Overview', path: '/boards/admin/overview', icon: 'dashboard' },
    // { label: 'Profile', path: '/boards/admin/profile', icon: 'person' },
    // { label: 'Settings', path: '/boards/admin/settings', icon: 'settings' },
  ];

  return (
    <div className="admin-dashboard d-flex">
      <SideNav navItems={navItems} onLogout={onLogout} />
      <MainContent role="admin" />
    </div>
  );
};

export default AdminDashboard;
