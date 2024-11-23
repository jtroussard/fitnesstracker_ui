import React, { useState, useEffect } from 'react';
import './profile.css';
import headerPic from '../../../../../assets/green-shapes.jpg';
import profilePic from '../../../../../assets/avatar.jpg';
import { memberDetailsInitialState } from '../../../../../common/states';

const Profile = ({ memberId }) => {
  const [activeTab, setActiveTab] = useState('profileDetails');
  const [memberDetails, setMemberDetails] = useState(memberDetailsInitialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMemberDetails = async () => {
      console.log("Fetching member details");
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/v1/member-details/${memberId}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        // Extract and validate the ApiResponse structure
        const apiResponse = await response.json();
        if (apiResponse && apiResponse.data) {
          setMemberDetails(apiResponse.data); // Populate state with `data` field from ApiResponse
        } else {
          throw new Error('Invalid response structure: Missing `data` in ApiResponse');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (memberId) {
      fetchMemberDetails();
    }
  }, [memberId]);

  const renderTabContent = () => {
    console.log(`Rendering member: ${JSON.stringify(memberDetails)}`);
    switch (activeTab) {
      case 'profileDetails':
        return memberDetails ? (
          <div>
            <h3>Member Details</h3>
            <p><strong>Username:</strong> {memberDetails.memberName}</p>
            <p><strong>Email:</strong> {memberDetails.email}</p>
          </div>
        ) : (
          <div>Loading member details...</div>
        );
      case 'history':
        return <div>History of member actions.</div>;
      case 'goals':
        return <div>Goals (disabled).</div>;
      case 'settings':
        return <div>App settings under member control.</div>;
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
        <div className="member-info">
          <div className="membername-section">
            <h2 className="membername">{memberDetails?.memberName || 'membername'}</h2>
          </div>
          <div className="indicator-section">
            <p className="member-id">@{memberDetails?.id || 'unique-id-or-locator'}</p>
          </div>
        </div>
      </div>

      {/* Error Handling */}
      {error && <div className="error-message">Error: {error}</div>}

      {/* Loading State */}
      {loading ? (
        <div className="loading-message">Loading...</div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default Profile;
