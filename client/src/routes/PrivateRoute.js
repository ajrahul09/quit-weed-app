import React, {useContext} from 'react';
import AuthContext from '../contexts/user-context';
import { Redirect } from 'react-router';

import { Route } from 'react-router-dom';

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