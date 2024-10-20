import React from 'react';
import SideNavItem from './SideNavItem';

const SideNav = ({ navItems, onLogout }) => {
  return (
    <nav className="side-nav p-3">
      <ul className="nav flex-column">
        {navItems.map((item) => (
          <SideNavItem key={item.path} label={item.label} path={item.path} icon={item.icon} />
        ))}
        <li className="nav-item mt-3">
          <button onClick={onLogout} className="btn btn-danger w-100 d-flex align-items-center">
            <i className="material-icons me-2">logout</i>Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;
