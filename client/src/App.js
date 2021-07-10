import React, { useContext } from 'react';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/SignUp/Login/Login';
import Register from './components/SignUp/Register/Register';
import MainHeader from './components/MainHeader/MainHeader';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

import './App.css';
import LandingPage from './components/LandingPage/LandingPage';

function App() {

  return (
    <React.Fragment>
      <Router>
        <MainHeader />

        <main>
          <Switch>
            <PublicRoute path="/login" restricted={true} component={Login} />
            <PublicRoute path="/register" restricted={true} component={Register} />
            <PublicRoute path="/" exact restricted={false} component={LandingPage} />
            
            <PrivateRoute path="/home" exact component={Home} />
            <PrivateRoute path="/dashboard" exact component={Dashboard} />
            
            <Route path="*" component={() => "404 not found"} />
          </Switch>
        </main>

      </Router>
    </React.Fragment>
  );
}

export default App;
