import React from 'react';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/SignUp/Login/Login';
import Register from './components/SignUp/Register/Register';
import MainHeader from './components/MainHeader/MainHeader';
import { HashRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import DailyLog from './components/DailyLog/DailyLog';
import DailyLogForm from './components/DailyLog/NewDailyLog/DailyLogForm';
import DailyLogChart from './components/Charts/DailyLogChart';
import ProfileForm from './components/Profile/ProfileForm';
import Error from './components/Error/Error';

function App() {

  return (
    <React.Fragment>
      <HashRouter>
        <MainHeader />

        <main>
          <Switch>
            <PublicRoute path="/login" restricted={true} component={Login} />
            <PublicRoute path="/register" restricted={true} component={Register} />
            <PublicRoute path="/" exact restricted={false} component={LandingPage} />

            <PrivateRoute path="/home" exact component={Home} />
            <PrivateRoute path="/dashboard" exact component={Dashboard} />
            <PrivateRoute path="/dailyLog" exact component={DailyLog} />
            <PrivateRoute path="/dailyLogForm" exact component={DailyLogForm} />
            <PrivateRoute path="/progress" exact component={DailyLogChart} />
            <PrivateRoute path="/profileForm" exact component={ProfileForm} />

            <Route path="*">
              <Error errorMsg="404: PAGE NOT FOUND" />
            </Route>
          </Switch>
        </main>

      </HashRouter>
    </React.Fragment>
  );
}

export default App;
