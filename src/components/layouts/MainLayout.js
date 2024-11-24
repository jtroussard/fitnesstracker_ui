import React from 'react';
import Extractor from '../../utils/Extractor';
import SideNav from '../navigation/SideNav';
import MainContent from '../main/MainContent';
import './layout.css';

const MainLayout = ({ onLogout }) => {

  const token = localStorage.getItem('jwt');
  const id = Extractor.extractId(token);

  return (
    <div className="main-layout">
      <SideNav onLogout={onLogout} />
      <MainContent />
    </div>
  );
};

export default MainLayout;
