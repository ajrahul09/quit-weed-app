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