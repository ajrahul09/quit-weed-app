import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../store/user-context';
import classes from './Navigation.module.css';

const Navigation = () => {

  const ctx = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <Link to="/home">Home</Link>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <Link to="/cravings">Cravings</Link>
          </li>
        )}
        {!ctx.isLoggedIn && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        {!ctx.isLoggedIn && (
          <li>
            <Link to="/register">Register</Link>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <button onClick={ctx.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
