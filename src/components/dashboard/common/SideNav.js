import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import SideNavItem from './SideNavItem';
import { AuthContext } from '../../../context/AuthContext';
import logo from '../../../assets/logo.png';
import '../../dashboard/Dashboard.css';

const SideNav = ({ navItems }) => {
  const { handleLogout, isAuthenticated, userRoles } = useContext(AuthContext);

  // Filter navItems based on user roles if necessary
  const filteredNavItems = navItems.filter(item => {
    if (userRoles.includes('ROLE_ADMIN') && item.path.includes('/admin')) return true;
    if (userRoles.includes('ROLE_MEMBER') && item.path.includes('/members')) return true;
    return false;
  });

  return (
    <nav className="side-nav p-3">
      {/* Logo Section */}
      <div className="side-nav-logo">
        <img src={logo} alt="App Logo" className="side-nav-logo-img" />
      </div>

      {/* Conditional Navigation Items */}
      {isAuthenticated ? (
        <ul className="nav flex-column justify-content-center align-items-center">
          {filteredNavItems.map((item) => (
            <SideNavItem key={item.path} label={item.label} path={item.path} icon={item.icon} />
          ))}
          <li className="nav-item mt-3">
            <button onClick={handleLogout} className="btn btn-danger w-100 d-flex align-items-center justify-content-center">
              <i className="material-icons me-2">logout</i>Logout
            </button>
          </li>
        </ul>
      ) : (
        <div className="nav flex-column justify-content-center align-items-center">
          <Link to="/auth/login" className="btn btn-primary w-100 mb-2 d-flex align-items-center justify-content-center">
            <i className="material-icons me-2">login</i>Sign In
          </Link>
          <Link to="/auth/register" className="btn btn-secondary w-100 d-flex align-items-center justify-content-center">
            <i className="material-icons me-2">person_add</i>Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default SideNav;
