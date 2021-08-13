import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../contexts/user-context';
import ApiContext from '../../contexts/api-context';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import './Toolbar.css';

const Navigation = (props) => {

  const ctx = useContext(AuthContext);
  const apiCtx = useContext(ApiContext);
  const profile = apiCtx.profile;

  let updatedProfile = false;

  if (profile && profile.hasOwnProperty('userId')) {
    updatedProfile = true;
  }

  const onLogout = () => {
    apiCtx.resetState();
    ctx.onLogout();
  }

  return (
    <header className="toolbar">
      <nav className="toolbar__navigation">
        <div className="toolbar__toggle-button">
          <DrawerToggleButton click={props.drawerClickHandler} />
        </div>
        <div className="toolbar__logo">
          <Link to="/">
            <div id="app-logo"></div>
          </Link>
        </div>
        <div className="spacer" />
        <div className="toolbar_navigation-items">
          <ul>
            {ctx.isLoggedIn && !apiCtx.isLoading && !updatedProfile && (
              <li>
                <Link to="/home">Home</Link>
              </li>
            )}
            {ctx.isLoggedIn && updatedProfile && (
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            )}
            {ctx.isLoggedIn && updatedProfile && (
              <li>
                <Link to="/dailyLog">Daily Log</Link>
              </li>
            )}
            {ctx.isLoggedIn && updatedProfile && (
              <li>
                <Link to="/progress">Progress</Link>
              </li>
            )}
            {ctx.isLoggedIn && updatedProfile && (
              <li>
                <Link to="/profileForm">Profile</Link>
              </li>
            )}
            {
              <li>
                <a href="https://quitweed.vibraute.com" target="_blank">Alternatives
                  <svg width="20px" height="20px" viewBox="0 0 24 24" className="alternatives-external-icon">
                    <g stroke-width="2.1" stroke="#4b8c1a" fill="none"
                      stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="17 13.5 17 19.5 5 19.5 5 7.5 11 7.5"></polyline>
                      <path d="M14,4.5 L20,4.5 L20,10.5 M20,4.5 L11,13.5"></path>
                    </g>
                  </svg>
                </a>
              </li>
            }
            {!ctx.isLoggedIn && (
              <li>
                <Link to="/login">Login
                  {/* <i class="arrow down"></i> */}
                </Link>
                {/* <div className="sub-menu">
                  <ul>
                    <li>Login2</li>
                    <li>Login3</li>
                  </ul>
                </div> */}
              </li>
            )}
            {!ctx.isLoggedIn && (
              <li>
                <Link to="/register">Register</Link>
              </li>
            )}
            {ctx.isLoggedIn && (
              <li>
                <button className="logout-button" onClick={onLogout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
