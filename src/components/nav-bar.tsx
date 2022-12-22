import React from 'react';
import { useNavigate } from 'react-router-dom';
import { setTheme as setThemeInDB } from '../api';
import { supportedThemes, tempUserGoodleId } from '../constants';
import './nar-bar.css';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <div className="navbar-item">
          <h1 className="hover-pointer">
            <b>CodeBook</b>
          </h1>
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
              navigate('/new');
              window.location.reload();
            }}
          >
            Create
          </div>
          <div className="navbar-item has-dropdown is-hoverable">
            <div className="navbar-link">Themes</div>
            <div className="navbar-dropdown">
              {supportedThemes.map((theme) => {
                return (
                  <div
                    key={Object.keys(theme)[0]}
                    className="navbar-item hover-pointer"
                    onClick={async () => {
                      await setThemeInDB(
                        tempUserGoodleId,
                        Object.keys(theme)[0]
                      );
                      window.location.reload();
                    }}
                  >
                    {Object.values(theme)[0]}
                  </div>
                );
              })}
              <hr className="navbar-divider" />
              <div className="navbar-item hover-pointer">Set to Default</div>
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
