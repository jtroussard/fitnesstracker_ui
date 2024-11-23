import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import routes from '../../configs/routes';
import logo from '../../assets/logo.png';
import './navigation.css';

const SideNav = () => {
  const { handleLogout, isAuthenticated, userRoles } = useContext(AuthContext);

  // Determine the navigation items based on user roles
  const navItems = [];
  if (isAuthenticated) {
    if (userRoles.includes('ROLE_MEMBER')) {
      navItems.push(
        ...routes.member.map(({ path, element: Component }) => ({
          path,
          label: Component.name.replace(/([A-Z])/g, ' $1').trim(), // Generate label dynamically if missing
        }))
      );
    }
    if (userRoles.includes('ROLE_ADMIN')) {
      navItems.push(
        ...routes.admin.map(({ path, element: Component }) => ({
          path,
          label: Component.name.replace(/([A-Z])/g, ' $1').trim(), // Generate label dynamically if missing
        }))
      );
    }
  }

  return (
    <nav className="side-nav p-3">
      {/* Logo Section */}
      <div className="side-nav-logo">
        <Link to="/"><img src={logo} alt="App Logo" className="side-nav-logo-img" /></Link>
      </div>

      {/* Navigation Items */}
      <ul className="nav flex-column justify-content-center align-items-center">
        {navItems.map(({ path, label }) => (
          <li key={path} className="nav-item">
            <Link to={path} className="nav-link">{label}</Link>
          </li>
        ))}
        {/* Logout Button */}
        {isAuthenticated ?
          (<li className="nav-item mt-3">
            <button onClick={handleLogout} className="btn btn-danger w-100">Logout</button>
          </li>) : (
            <div className="nav flex-column justify-content-center align-items-center">
              <Link
                to={routes.public.find(route => route.name === 'Login')?.path}
                className="btn btn-primary w-100 mb-2 d-flex align-items-center justify-content-center"
              >
                <i className="material-icons me-2">login</i>Sign In
              </Link>
              <Link 
                to={routes.public.find(route => route.name === 'Register')?.path} 
                className="btn btn-secondary w-100 d-flex align-items-center justify-content-center">
                <i className="material-icons me-2">person_add</i>Sign Up
              </Link>
            </div>
          )
        }
      </ul>
    </nav>
  );
};

export default SideNav;
