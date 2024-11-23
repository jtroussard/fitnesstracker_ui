import {React, useContext } from 'react';
import SideNav from '../navigation/SideNav';
import MainContent from '../main/MainContent';
import { AuthContext } from '../../context/AuthContext.js';
import routes from '../../configs/routes.js';
import './layout.css';

const MainLayout = ({ onLogout }) => {
  const { userId } = useContext(AuthContext);

  return (
    <div className="main-layout">
      <SideNav onLogout={onLogout} />
      <MainContent memberId={userId} />
    </div>
  );
};

export default MainLayout;
