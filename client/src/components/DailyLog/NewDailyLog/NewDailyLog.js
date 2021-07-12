import React, { useState } from "react";
import DailyLogForm from './DailyLogForm';

import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
import styles from './NewDailyLog.module.css';

const NewDailyLog = ({ dailyLog }) => {

    const [showNewDailyLogForm, setShowNewDailyLogForm] = useState(false);

    const newDailyLogHandler = () => {
        setShowNewDailyLogForm(!showNewDailyLogForm);
    }

    return (
        <>
            {!showNewDailyLogForm && dailyLog && dailyLog.length == 0 &&
                (<Card className={styles.newDailyLogContainer}>
                    <div className={styles.dailyLogImage}></div>
                    <div>
                        <Button
                            onClick={newDailyLogHandler}
                            className={styles.dailyLogButton}>
                            Add new log
                        </Button>
                    </div>
                </Card>)
            }
            {!showNewDailyLogForm && dailyLog && dailyLog.length > 0 &&
                <div className={styles.addNewLogDiv}>
                    <Button
                        onClick={newDailyLogHandler}
                        className={styles.addNewLogButton}>
                        Add new log
                    </Button>
                </div>
            }
            {showNewDailyLogForm && <DailyLogForm />}
        </>
    )
}

export default NewDailyLog;