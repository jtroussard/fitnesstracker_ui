import React from 'react';
import SideNav from '../common/SideNav';
import MainContent from '../common/MainContent';

const MemberDashboard = ({ onLogout, user }) => {
  const navItems = [
    { label: 'Overview', path: '/boards/member/overview', icon: 'dashboard' },
    { label: 'Profile', path: '/boards/member/profile', icon: 'person' },
    { label: 'Settings', path: '/boards/member/settings', icon: 'settings' },
  ];

  return (
    <div className="member-dashboard d-flex">
      <SideNav navItems={navItems} onLogout={onLogout} />
      <MainContent role="ROLE_MEMBER" />
    </div>
  );
};

export default MemberDashboard;
