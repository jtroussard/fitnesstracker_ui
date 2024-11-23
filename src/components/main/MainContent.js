import React from 'react';
import ProtectedRoutes from '../../routing/ProtectedRoutes';
import './main.css';

const MainContent = ({ memberId }) => {
  return (
    <div className="main-content container-fluid">
      <ProtectedRoutes memberId={memberId} />
    </div>
  );
};

export default MainContent;
