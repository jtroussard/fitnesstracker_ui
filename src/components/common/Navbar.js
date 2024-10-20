import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import MainButton from './MainButton';
import logo from '../../assets/logo.png'; // Adjust the path to your logo file

const Navbar = () => {
  const { handleLogout, isAuthenticated } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-fix">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img 
            src={logo} 
            alt="Brand Logo" 
            style={{ height: '72px' }} // Adjust the height as needed
            className="d-inline-block align-top"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item me-3">
              <Link to="/" className="d-flex align-items-center nav-link-no-style">
                <i className="material-icons">home</i>HOME
              </Link>
            </li>
            <li className="nav-item me-3">
              <Link className="d-flex align-items-center nav-link-no-style" to="/about">
                <i className="material-icons">info</i>ABOUT
              </Link>
            </li>
            <li className="nav-item me-3">
              <Link className="d-flex align-items-center nav-link-no-style" to="/contact">
                <i className="material-icons">mail</i>CONTACT
              </Link>
            </li>
            {isAuthenticated ? (
              <>
                <li className="nav-item me-3">
                  <Link className="d-flex align-items-center nav-link-no-style" to="/profile">
                    <i className="material-icons">person</i>PROFILE
                  </Link>
                </li>
                <li className="nav-item me-3">
                  <MainButton
                    text="Logout"
                    onClick={handleLogout}
                    className="btn-danger"
                    icon="logout"
                  />
                </li>
              </>
            ) : (
              <>
                <li className="nav-item me-3">
                  <Link className="d-flex align-items-center nav-link-no-style" to="/auth/login">
                    <i className="material-icons">login</i>LOGIN
                  </Link>
                </li>
                <li className="nav-item me-3">
                  <Link className="d-flex align-items-center nav-link-no-style" to="/auth/register">
                    <i className="material-icons">how_to_reg</i>REGISTER
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
