import React, { useState, useEffect, useReducer, useContext } from 'react';
import { withRouter } from 'react-router';

import AuthContext from '../../../contexts/user-context';
import Card from '../../UI/Card/Card';
import classes from './Register.module.css';
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

const Register = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailEntered, emailDispatch] = useReducer(emailReducer,
    { value: '', isValid: null });

  const [passEntered, passDispatch] = useReducer(passReducer,
    { value: '', isValid: null });

  const { isValid: emailIsValid } = emailEntered;
  const { isValid: passIsValid } = passEntered;

  const [nameEntered, setNameEntered] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shakeonError, setShakeonError] = useState('');
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const formValidityTimout = setTimeout(() => {
      console.log('Checking form validity!!');
      setFormIsValid(
        emailIsValid && passIsValid
      );
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(formValidityTimout);
    }
  }, [emailIsValid, passIsValid])

  const emailChangeHandler = (event) => {
    emailDispatch({ type: 'EMAIL_CHANGE', val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    passDispatch({ type: 'PASS_CHANGE', val: event.target.value });
  };

  const nameChangeHandler = (event) => {
    setNameEntered(event.target.value);
  };

  const validateEmailHandler = () => {
    emailDispatch({ type: 'EMAIL_BLUR' });
  };

  const validatePasswordHandler = () => {
    passDispatch({ type: 'PASS_BLUR' })
  };

  const handleRegistrationError = (message) => {
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
    const response = await authCtx.onRegister(nameEntered, emailEntered.value, passEntered.value);
    setIsLoading(false);

    if (!response.ok) {
      handleRegistrationError(response.message);
      return;
    }

    setMessage(response.message);
  };

  const switchToLogin = () => {
    return props.history.push("/login");
  }

  let msgClass = classes.successMsg;
  if (isError) {
    msgClass = classes.failureMsg;
  }

  return (
    <>
      <div className={classes.regHeadingDiv}>
        <h1 className={classes.regHeading}>
          Register
        </h1>
      </div>
      <Card className={`${classes.register} ${shakeonError}`}>
        <form onSubmit={submitHandler}>
          <Input
            id="name"
            label="Name"
            type="text"
            onChange={nameChangeHandler}
            value={nameEntered}
          />
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
              Register
            </Button>
          </div>
          <div className={classes.redirectToLoginDiv}>
            <p>If you're already a user, &nbsp;
              <span className={classes.switchToLogin} onClick={switchToLogin}>
                <u>Login here</u>
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

export default withRouter(Register);
