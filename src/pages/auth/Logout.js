import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';  // Import AuthContext
import MainButton from '../../components/common/MainButton';

const Logout = () => {
  const { handleLogout } = useContext(AuthContext);  // Use AuthContext

  return (
    <MainButton 
    text="Logout"
    onClick={handleLogout}
    className="btn-danger"
    icon="logout"
    />
  );
};

export default Logout;
