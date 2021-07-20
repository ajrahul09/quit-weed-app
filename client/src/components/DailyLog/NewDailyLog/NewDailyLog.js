import React from "react";
import { withRouter } from 'react-router';

import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
import styles from './NewDailyLog.module.css';

const NewDailyLog = (props) => {

    const newDailyLogHandler = () => {
        return props.history.push("/dailyLogForm");
    }

    const dateFormatter = (date) => {
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        return (<>
            <h3>{date.toISOString().slice(0, 10)}</h3>
            <h4>{date.toISOString().slice(11, 16)}</h4>
        </>)
    }

    const DailyLogHistory = () => {
        if (props.dailyLog && props.dailyLog.length > 0) {
            return (
                <div className={styles.dailyLogRow}>
                    {props.dailyLog.map((log, index) => {
                        return <CalendarDailyLog log={log} key={index} />
                    })}
                </div>
            )
        }
    }

    const CalendarDailyLog = ({ log }) => {
        return (
            <div className={styles.calendarDiv}>
                <div style={{ flex: 1 }}></div>
                <div className={styles.calendar}></div>
                <div className={styles.dailyLogDate}>
                    <div className={styles.logHistoryDate}>
                        {dateFormatter(new Date(log.createdTime))}
                    </div>
                    <div className={styles.logHistoryStats}>
                        <p>Cravings: {log.cravings}/10</p>
                        <p>Motivation: {log.motivation}/10</p>
                    </div>
                </div>
                <div style={{ flex: 1 }}></div>
            </div>
        )
    }

    return (
        <>
            {props.dailyLog && props.dailyLog.length === 0 &&
                (<div>
                    <div className={styles.newDailyLogFormHeadingDiv}>
                        <h1 className={styles.newDailyLogFormHeading}>
                            Daily Log
                        </h1>
                    </div>
                    <Card className={styles.newDailyLogContainer}>
                        <div className={styles.dailyLogImage}></div>
                        <div className={styles.dailyLogButtonDiv}>
                            <Button
                                onClick={newDailyLogHandler}
                                className={styles.dailyLogButton}>
                                Add new log
                            </Button>
                        </div>
                    </Card>
                </div>)
            }
            {props.dailyLog && props.dailyLog.length > 0 &&
                <div className={styles.addNewLogDiv}>
                    <Button
                        onClick={newDailyLogHandler}
                        className={styles.addNewLogButton}>
                        Add New Log
                    </Button>
                </div>
            }
            {props.dailyLog && props.dailyLog.length > 0 &&
                <DailyLogHistory />
            }
        </>
    )
}

export default withRouter(NewDailyLog);