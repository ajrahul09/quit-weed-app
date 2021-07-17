import React, { useState, useEffect, useReducer, useContext } from 'react';

import { withRouter } from 'react-router';

import AuthContext from '../../../contexts/user-context';
import Card from '../../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input'

const emailReducer = (state, action) => {
  if (action.type === 'EMAIL_CHANGE') {
    return { value: action.val, isValid: action.val.includes('@') };
  }
  if (action.type === 'EMAIL_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') };
  }
  return { value: '', isValid: false };
}

const passReducer = (state, action) => {
  if (action.type === 'PASS_CHANGE') {
    return { value: action.val, isValid: true };
  }
  if (action.type === 'PASS_BLUR') {
    return { value: state.value, isValid: true };
  }
  return { value: '', isValid: false };
}

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailEntered, emailDispatch] = useReducer(emailReducer,
    { value: '', isValid: null });

  const [passEntered, passDispatch] = useReducer(passReducer,
    { value: '', isValid: null });

  const { isValid: emailIsValid } = emailEntered;
  const { isValid: passIsValid } = passEntered;
  const [isLoading, setIsLoading] = useState(false);
  const [shakeonError, setShakeonError] = useState('');
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const formValidityTimout = setTimeout(() => {
      setFormIsValid(
        emailIsValid && passIsValid
      );
    }, 500);

    return () => {
      clearTimeout(formValidityTimout);
      setFormIsValid(false);
    }
  }, [emailIsValid, passIsValid])

  const emailChangeHandler = (event) => {
    emailDispatch({ type: 'EMAIL_CHANGE', val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    passDispatch({ type: 'PASS_CHANGE', val: event.target.value });
  };

  const validateEmailHandler = () => {
    emailDispatch({ type: 'EMAIL_BLUR' });
  };

  const validatePasswordHandler = () => {
    passDispatch({ type: 'PASS_BLUR' })
  };

  const handleLoginError = (message) => {
    setIsError(true);
    setMessage(message);
    setShakeonError(classes.shake);
    setTimeout(() => {
      setShakeonError('');
    }, 250);
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const response = await authCtx.onLogin(emailEntered.value, passEntered.value);
    setIsLoading(false);

    if (!response.ok) {
      handleLoginError(response.message);
      return;
    }

    setMessage(response.message);

    return props.history.push("/home");
  };

  const switchToRegister = () => {
    return props.history.push("/register");
  }

  let msgClass = classes.successMsg;
  if (isError) {
    msgClass = classes.failureMsg;
  }

  return (
    <>
      <div className={classes.loginHeadingDiv}>
        <h1 className={classes.loginHeading}>
          Login
        </h1>
      </div>
      <Card className={`${classes.login} ${shakeonError}`}>
        <form onSubmit={submitHandler}>
          <Input
            id="email"
            label="E-mail"
            type="email"
            isValid={emailIsValid}
            value={emailEntered.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            isValid={passIsValid}
            value={passEntered.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
          <div className={classes.actions}>
            <Button
              type="submit"
              className={classes.btn}
              disabled={!formIsValid}
              isLoading={isLoading}>
              Login
            </Button>
          </div>
          <div className={classes.redirectToRegisterDiv}>
            <p>If you are a new user,&nbsp;
              <span className={classes.switchToReg} onClick={switchToRegister}>
                <u>Register here</u>
              </span>
            </p>
          </div>
        </form>
      </Card>
      <div className={`${msgClass} ${classes.messageDiv}`}>
        <p className={classes.message}>{message}</p>
      </div>
    </>
  );
};

export default withRouter(Login);
