import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
      <ul className='navbar-nav'>
        <li className='nav-item me-3'>
          <Link to="/" className='d-flex align-items-center' style={{ textDecoration: 'none', color: 'inherit' }}>
          <i className="material-icons">home</i>HOME
          </Link>
        </li>
        <li className='nav-item me-3'>
          <Link className='d-flex align-items-center' style={{ textDecoration: 'none', color: 'inherit' }} to="/about">
          <i className="material-icons">info</i>ABOUT</Link>
        </li>
        <li className='nav-item me-3'>
          <Link className='d-flex align-items-center' style={{ textDecoration: 'none', color: 'inherit' }} to="/contact">
          <i className="material-icons">mail</i>CONTACT</Link>
        </li>
        {isAuthenticated ? (
          <>
            <li className='nav-item me-3'>
              <Link className='d-flex align-items-center' style={{ textDecoration: 'none', color: 'inherit' }} to="/profile">
              <i class="material-symbols-outlined">manage_accounts</i>PROFILE</Link>
            </li>
            <li className='nav-item me-3'>
              <button onClick={onLogout}><i className="material-icons">logout</i>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li className='nav-item me-3'>
              <Link className='d-flex align-items-center' style={{ textDecoration: 'none', color: 'inherit' }} to="/login">
              <i className="material-icons">login</i>LOGIN</Link>
            </li>
            <li className='nav-item me-3'>
              <Link className='d-flex align-items-center' style={{ textDecoration: 'none', color: 'inherit' }} to="/register">
              <i className="material-icons">how_to_reg</i>REGISTER</Link>
            </li>
          </>
        )}
      </ul>
      </div>
    </nav>
  );
};

export default Navbar;
