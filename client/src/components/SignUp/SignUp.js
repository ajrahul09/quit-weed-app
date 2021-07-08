import React, { useState, useContext } from 'react';
import Login from './Login/Login'
import Register from './Register/Register'
import AuthContext from '../../store/user-context';

const SignUp = () => {

    const authCtx = useContext(AuthContext);
    const [showRegisterationForm, setShowRegistrationForm] = useState(false);

    const toggleSignUpForm = () => {
        setShowRegistrationForm(!showRegisterationForm);
    }

    let content = <Login register={toggleSignUpForm} />
    if (showRegisterationForm) {
        content = <Register login={toggleSignUpForm} />
    }

    return (

        <>
            {authCtx.registrationComplete &&
                <p>Registration Complete. Login to Proceed</p>}
            {content}
        </>
    );
}

export default SignUp;