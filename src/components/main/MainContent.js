import React, { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import MemberOverview from '../content/member/view/overview/MemberOverview';
import MemberProfile from '../content/member/view/profile/MemberProfile';
import MemberSettings from '../content/member/view/setting/MemberSettings';
import AdminOverview from '../content/admin/view/overview/AdminOverview';
import BioEntryView from '../content/member/view/bio-entry/BioEntryView'
import FitnessEntryView from '../content/member/view/fitness-entry/FitnessEntryView';
import NutritionEntryView from '../content/member/view/nutrition-entry/NutritionEntryView';
import Login from '../auth/Login';
import Register from '../auth/Register';
import LandingPage from '../home/LandingPage';
import './main.css'

const NotFoundPage = () => <h2>404 - Page Not Found?</h2>;

const MainContent = () => {
  const { isAuthenticated, userRoles } = useContext(AuthContext);

  // Log authentication and roles on initial load and whenever they change
  useEffect(() => {
    console.log('isAuthenticated:', isAuthenticated);
    console.log('userRoles:', userRoles);
  }, [isAuthenticated, userRoles]);

  return (
    <div className="main-content container-fluid">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

        {/* Member Routes */}
        {isAuthenticated && userRoles.includes('ROLE_MEMBER') ? (
          <>
            {console.log('Rendering member routes')}
            <Route path="/boards/members/overview" element={<MemberOverview />} />
            <Route path="/boards/members/bio" element={<BioEntryView />} />
            <Route path="/boards/members/fitness" element={<FitnessEntryView />} />
            <Route path="/boards/members/nutrition" element={<NutritionEntryView />} />
            <Route path="/boards/members/profile" element={<MemberProfile />} />
            <Route path="/boards/members/settings" element={<MemberSettings />} />
          </>
        ) : (
          isAuthenticated && console.log('User does not have ROLE_MEMBER')
        )}

        {/* Admin Routes */}
        {isAuthenticated && userRoles.includes('ROLE_ADMIN') ? (
          <>
            {console.log('Rendering admin routes')}
            <Route path="/boards/admin/overview" element={<AdminOverview />} />
          </>
        ) : (
          isAuthenticated && console.log('User does not have ROLE_ADMIN')
        )}

        {/* 404 - Not Found Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default MainContent;
