import React, { useState } from 'react';
import { useUser } from '../../../../../context/UserContext';
import './profile.css';
import headerPic from '../../../../../assets/green-shapes.jpg';
import profilePic from '../../../../../assets/avatar.jpg';
import { userDetailsInitalState } from '../../../../../common/states.js'

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profileDetails');
  const [userDetails, setUserDetails] = useState({})



  const renderTabContent = () => {
    console.log(`rendering user ${JSON.stringify(user)}`)
    switch (activeTab) {
      case 'profileDetails':
        return user ? (
          <div>
            <h3>User Details</h3>
            <p><strong>Username:</strong> {user.memberName}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        ) : (
          <div>Loading user details...</div>
        );
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
            <h2 className="username">{user?.memberName || 'Username'}</h2>
          </div>
          <div className="indicator-section">
            <p className="user-id">@{user?.id || 'unique-id-or-locator'}</p>
          </div>
        </div>
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
