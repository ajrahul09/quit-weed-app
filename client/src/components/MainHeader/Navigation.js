import React, {useContext} from 'react';

import AuthContext from '../../store/user-context';
import classes from './Navigation.module.css';

const Navigation = () => {

  const ctx = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Dashboard</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Cravings</a>
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
