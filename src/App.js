import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/home/LandingPage';
import AuthRoutes from './routes/AuthRoutes';
import DashboardRoutes from './routes/DashboardRoutes';
import SideNav from './components/dashboard/common/SideNav';
import MainContent from './components/dashboard/common/MainContent';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="member-dashboard">
          <SideNav
            navItems={[
              { label: 'Overview', path: '/boards/members/overview', icon: 'dashboard' },
              { label: 'Body Metrics', path: '/boards/members/bio', icon: 'monitor_weight' },
              { label: 'Fitness', path: '/boards/members/fitness', icon: 'fitness_center' },
              { label: 'Nutrition', path: '/boards/members/nutrition', icon: 'restaurant' },
              { label: 'Profile', path: '/boards/members/profile', icon: 'person' },
              { label: 'Settings', path: '/boards/members/settings', icon: 'settings' },
            ]}
          />
          <MainContent />
        </div>
        <ToastContainer />
      </AuthProvider>
    </Router>
  );
}

export default App;
