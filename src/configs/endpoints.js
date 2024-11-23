const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api/v1';

const endpoints = {
  memberDetails: (memberId) => `${BASE_URL}/member-details/${memberId}`,
  updateMemberDetails: (memberId) => `${BASE_URL}/member-details/${memberId}`,
  deleteMemberDetails: (memberId) => `${BASE_URL}/member-details/${memberId}`,
};

export default endpoints;
