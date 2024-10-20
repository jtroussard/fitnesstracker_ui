import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MemberOverview from '../member/views/MemberOverview';
import MemberProfile from '../member/views/MemberProfile';
import MemberSettings from '../member/views/MemberSettings';
import AdminOverview from '../admin/views/AdminOverview';

const MainContent = ({ role }) => {
  return (
    <div className="main-content container-fluid">
      <Routes>
        {role === 'ROLE_MEMBER' && (
          <>
            <Route path="overview" element={<MemberOverview />} />
            <Route path="profile" element={<MemberProfile />} />
            <Route path="settings" element={<MemberSettings />} />
          </>
        )}
        
        {/* Admin Routes */}
        {role === 'ROLE_ADMIN' && (
          <>
            <Route path="overview" element={<AdminOverview />} />
          </>
        )}

        {/* Default Redirection */}
        <Route path="*" element={<Navigate to="overview" />} />
      </Routes>
    </div>
  );
};

export default MainContent;
