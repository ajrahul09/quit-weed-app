import React from 'react'

import Card from '../UI/Card/Card'
import styles from './Error.module.css'

const Error = props => {
    return (
        <Card className={styles.errorContainer}>
            <h2 className={styles.centerAlign}>
                {props.errorMsg}
                {!props.errorMsg && <span>Something went wrong!</span>}
            </h2>
        </Card>
    )

}

export default Error;