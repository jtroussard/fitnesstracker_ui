import React from 'react';
import ProtectedRoutes from '../../routing/ProtectedRoutes';
import './main.css';

const MainContent = () => {
  return (
    <div className="main-content container-fluid">
      <ProtectedRoutes />
    </div>
  );
};

export default MainContent;
