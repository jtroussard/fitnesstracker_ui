import React, { useState } from 'react';
import './profile.css';
import headerPic from '../../../../../assets/green-shapes.jpg';
import profilePic from '../../../../../assets/avatar.jpg';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profileDetails');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profileDetails':
        return <div>Profile details (read-only).</div>;
      case 'history':
        return <div>History of user actions.</div>;
      case 'goals':
        return <div>Goals (disabled).</div>;
      case 'settings':
        return <div>App settings under user control.</div>;
      default:
        return null;
    }
  };

  return (
    <div className="profile-page">
      {/* Header Section */}
      <div className="profile-header">
        <div className="banner">
          <img src={headerPic} alt="Banner" className="banner-image" />
        </div>
        <div className="avatar-container">
          <img src={profilePic} alt="Profile Avatar" className="avatar" />
        </div>
        <div className="user-info">
          <div className="username-section">
            <h2 className="username">Username</h2>
          </div>
          <div className="indicator-section">
            <p className="user-id">@unique-id-or-locator</p>
          </div>
          <div className="stats-section">
            <div className="stats">

              <span>
                <span class="badge rounded-pill text-bg-info d-flex align-items-center">
                  <span class="material-icons-outlined me-1">health_and_safety</span>
                  15
                  <span class="visually-hidden">total bio measurement entries</span>
                </span>
              </span>


              <span>
                <span class="badge rounded-pill text-bg-info d-flex align-items-center">
                  <span class="material-icons-outlined">directions_run</span>
                  0
                  <span class="visually-hidden">total fitness entries</span>
                </span>
              </span>

              <span>
                <span class="badge rounded-pill text-bg-info d-flex align-items-center">
                  <span class="material-icons-outlined">restaurant</span>
                  4
                  <span class="visually-hidden">total nutrition entries</span>
                </span>
              </span>

            </div>
          </div>
        </div>
      </div>

{/* Temporary Carousel */}
<div className="achievements-carousel">
  <span className="carousel-chevron carousel-chevron-left">
    <span className="material-icons-outlined">chevron_left</span>
  </span>
  <div className="carousel-placeholder">
    <p>Achievements Viewer Feature Coming Soon</p>
  </div>
  <span className="carousel-chevron carousel-chevron-right">
    <span className="material-icons-outlined">chevron_right</span>
  </span>
</div>


      {/* Tabs Section */}
      <div className="profile-tabs">
        <button
          className={`tab ${activeTab === 'profileDetails' ? 'active' : ''}`}
          onClick={() => setActiveTab('profileDetails')}
        >
          Profile Details
        </button>
        <button
          className={`tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          History
        </button>
        <button className="tab disabled">Goals</button>
        <button
          className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>

      {/* Selected Tab Content */}
      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
};

export default Profile;
