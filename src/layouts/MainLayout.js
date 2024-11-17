import React from 'react';
import SideNav from '../components/navigation/SideNav';
import MainContent from '../components/main/MainContent';
import './layout.css';

const MainLayout = ({ onLogout }) => {
  const navItems = [
    { label: 'Overview', path: '/boards/members/overview', icon: 'dashboard' },
    { label: 'Body Metrics', path: '/boards/members/bio', icon: 'monitor_weight' },
    { label: 'Fitness', path: '/boards/members/fitness', icon: 'fitness_center' },
    { label: 'Nutrition', path: '/boards/members/nutrition', icon: 'restaurant' },
    { label: 'Profile', path: '/boards/members/profile', icon: 'person' },
    { label: 'Settings', path: '/boards/members/settings', icon: 'settings' },
  ];

  return (
    <div className="main-layout">
      <SideNav navItems={navItems} onLogout={onLogout} />
      <MainContent role="ROLE_MEMBER" />
    </div>
  );
};

export default MainLayout;
