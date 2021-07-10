import React, {useContext} from 'react';
import AuthContext from '../contexts/user-context';
import { Redirect } from 'react-router';

import { Route } from 'react-router-dom';

const PublicRoute = ({component: Component, restricted, ...rest}) => {

    const authCtx = useContext(AuthContext);

    return (
        <Route {...rest} render={(props) => {
            if(!authCtx.isLoading) {
                if(authCtx.isLoggedIn && restricted) {
                    return <Redirect to="/" />
                } else {
                    return <Component />
                }
            }
        }} />
    )
}

export default PublicRoute;