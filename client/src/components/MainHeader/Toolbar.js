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
  
  if(profile && profile.hasOwnProperty('userId')) {
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
                <Link to="/dailyLog">DailyLog</Link>
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
