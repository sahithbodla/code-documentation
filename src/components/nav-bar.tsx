import React from 'react';
import { useNavigate } from 'react-router-dom';
import './nar-bar.css';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <div className="navbar-item">
          <button className="button is-light is-primary is-rounded">
            Code Documentation
          </button>
        </div>
        <a
          href="www.goggle.com"
          role="button"
          aria-label="button"
          aria-expanded="false"
          data-target="mainNavbar"
          className="navbar-burger"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div className="navbar-menu" id="mainNavbar">
        <div className="navbar-start">
          <div
            className="navbar-item hover-pointer"
            onClick={() => {
              navigate('/');
            }}
          >
            Home
          </div>
          <div
            className="navbar-item hover-pointer"
            onClick={() => {
              navigate('/create');
              window.location.reload();
            }}
          >
            Create New
          </div>
          <div className="navbar-item has-dropdown is-hoverable">
            <div className="navbar-link">Themes</div>
            <div className="navbar-dropdown">
              <div className="navbar-item hover-pointer">Super Man</div>
              <div className="navbar-item hover-pointer">Spider Man</div>
              <div className="navbar-item hover-pointer">Bat Man</div>
              <hr className="navbar-divider" />
              <div className="navbar-item hover-pointer">Default Theme</div>
            </div>
          </div>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <div className="button is-primary is-rounded">
                <strong>Sign up</strong>
              </div>
              <div className="button is-light is-rounded">Log in</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
