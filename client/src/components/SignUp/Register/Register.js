import React, { useState, useEffect, useReducer, useContext } from 'react';

import AuthContext from '../../../store/user-context';
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
    return { value: action.val, isValid: action.val.length > 6 };
  }
  if (action.type === 'PASS_BLUR') {
    return { value: state.value, isValid: state.value.length > 6 };
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

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onRegister(nameEntered, emailEntered.value, passEntered.value);
    props.login();
  };

  return (
    <Card className={classes.register}>
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
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Register
          </Button>
        </div>
        <div>
          <p>If you're already a user, &nbsp;
            <span onClick={props.login}>
              Login here
            </span>
          </p>
        </div>
      </form>
    </Card>
  );
};

export default Register;
