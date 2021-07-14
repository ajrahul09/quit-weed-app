import React from "react";
import { withRouter } from 'react-router';

import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
import styles from './NewDailyLog.module.css';

const NewDailyLog = (props) => {

    const newDailyLogHandler = () => {
        return props.history.push("/dailyLogForm");
    }

    return (
        <>
            {props.dailyLog && props.dailyLog.length === 0 &&
                (<Card className={styles.newDailyLogContainer}>
                    <div className={styles.dailyLogImage}></div>
                    <div className={styles.dailyLogButtonDiv}>
                        <Button
                            onClick={newDailyLogHandler}
                            className={styles.dailyLogButton}>
                            Add new log
                        </Button>
                    </div>
                </Card>)
            }
            {props.dailyLog && props.dailyLog.length > 0 &&
                <div className={styles.addNewLogDiv}>
                    <Button
                        onClick={newDailyLogHandler}
                        className={styles.addNewLogButton}>
                        Add new log
                    </Button>
                </div>
            }
        </>
    )
}

export default withRouter(NewDailyLog);