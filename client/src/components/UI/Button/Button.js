import React from 'react';

import classes from './Button.module.css';

const Button = (props) => {

  let loading = '';
  let disabled = props.disabled;
  let children = props.children;
  
  if(props.isLoading) {
    loading = classes.loading
    disabled = true;
    children = '';
  }

  return (
    <button
      type={props.type || 'button'}
      className={`${classes.button} ${props.className} ${loading}`}
      onClick={props.onClick}
      disabled={disabled}
      name={props.name}
    >
      {children}
    </button>
  );
};

export default Button;
