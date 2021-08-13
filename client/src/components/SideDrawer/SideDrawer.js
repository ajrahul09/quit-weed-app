import React, {useContext} from 'react'
import { Link } from 'react-router-dom';

import AuthContext from '../../contexts/user-context';
import ApiContext from '../../contexts/api-context';

import './SideDrawer.css'

const SideDrawer = props => {

  const ctx = useContext(AuthContext);
  const apiCtx = useContext(ApiContext);
  const profile = apiCtx.profile;
  
  let updatedProfile = false;
  
  if(profile && profile.hasOwnProperty('userId')) {
    updatedProfile = true;
  }

  let drawerClasses = 'side-drawer'
  if(props.show) {
    drawerClasses = 'side-drawer open';
  }

  const onLogout = () => {
    apiCtx.resetState();
    ctx.onLogout();
  }

  return (
    <nav className={drawerClasses}>
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
                <button className="logout-button-sidebar" onClick={onLogout}>Logout</button>
              </li>
            )}
          </ul>
    </nav>
  )
}

export default SideDrawer;