import React, {useContext} from 'react';
import AuthContext from '../store/user-context';
import { Redirect } from 'react-router';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {

    const authCtx = useContext(AuthContext);

    return (
        <Route {...rest} render={(props) => {
            if(!authCtx.isLoading) {
                if(authCtx.isLoggedIn) {
                    return <Component />
                } else {
                    return <Redirect to="/login" />
                }
            }
        }} />
    )
}

export default PrivateRoute;