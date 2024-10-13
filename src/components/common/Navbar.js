import MainButton from './MainButton';
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
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
                  <i className="material-icons">person</i>PROFILE</Link>
              </li>
              <li className='nav-item me-3'>
                <MainButton
                  text="Logout"
                  onClick={onLogout}
                  className="btn-danger"
                  icon="logout"
                />

              </li>
            </>
          ) : (
            <>
              <li className='nav-item me-3'>
                <Link className='d-flex align-items-center' style={{ textDecoration: 'none', color: 'inherit' }} to="/auth/login">
                  <i className="material-icons">login</i>LOGIN</Link>
              </li>
              <li className='nav-item me-3'>
                <Link className='d-flex align-items-center' style={{ textDecoration: 'none', color: 'inherit' }} to="/auth/register">
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
