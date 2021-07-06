import React, {useContext} from 'react';
import AuthContext from './store/user-context';
import Home from './components/Home/Home';
import SignUp from './components/SignUp/SignUp';

import './App.css';

function App() {

  const authCtx = useContext(AuthContext);

  return (
    <React.Fragment>
      <main>
        {authCtx.isLoading && <p>Loading...</p>}
        {!authCtx.isLoading && !authCtx.isLoggedIn && <SignUp />}
        {!authCtx.isLoading && authCtx.isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  );
}

export default App;