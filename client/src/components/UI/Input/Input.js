import React from 'react'

import classes from './Input.module.css'

const Input = (props) => {
    return (
        <div
            className={`${classes.control} ${props.isValid === false ? classes.invalid : ''
                }`}
        >
            <label htmlFor={props.id}>{props.label}</label>
            {props.displayMinMax && <span className={classes.minMax}>{props.min}</span>}
            <input
                type={props.type}
                id={props.id}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
                max={props.max}
                min={props.min}
            />
            {props.displayMinMax && <span className={classes.minMax}>{props.max}</span>}
        </div>
    )
}

export default Input