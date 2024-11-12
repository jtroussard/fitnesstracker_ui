import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import MemberOverview from '../member/views/MemberOverview';
import MemberProfile from '../member/views/MemberProfile';
import MemberSettings from '../member/views/MemberSettings';
import AdminOverview from '../admin/views/AdminOverview';
import BioEntryView from '../member/views/BioEntryView';
import FitnessEntryView from '../member/views/FitnessEntryView';
import NutritionEntryView from '../member/views/NutritionEntryView';
import Login from '../../auth/Login';
import Register from '../../auth/Register';

const MainContent = () => {
  const { isAuthenticated, userRoles } = useContext(AuthContext);

  return (
    <div className="main-content container-fluid">
      <Routes>
        {/* Authentication Routes */}
        {!isAuthenticated && (
          <>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
          </>
        )}

        {/* Routes for Member */}
        {isAuthenticated && userRoles.includes('ROLE_MEMBER') && (
          <>
            <Route path="/boards/members/overview" element={<MemberOverview />} />
            <Route path="/boards/members/bio" element={<BioEntryView />} />
            <Route path="/boards/members/fitness" element={<FitnessEntryView />} />
            <Route path="/boards/members/nutrition" element={<NutritionEntryView />} />
            <Route path="/boards/members/profile" element={<MemberProfile />} />
            <Route path="/boards/members/settings" element={<MemberSettings />} />
          </>
        )}

        {/* Routes for Admin */}
        {isAuthenticated && userRoles.includes('ROLE_ADMIN') && (
          <Route path="/boards/admin/overview" element={<AdminOverview />} />
        )}

        {/* Default Redirection */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/boards/members/overview" : "/auth/login"} />} />
      </Routes>
    </div>
  );
};

export default MainContent;
