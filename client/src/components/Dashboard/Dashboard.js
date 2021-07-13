import React, { useState, useEffect, useCallback, useContext } from 'react'
import ApiContext from '../../contexts/api-context';
import styles from './Dashboard.module.css';

import Progress from '../UI/Progress/Progress';


const Dashboard = (props) => {

    const apiCtx = useContext(ApiContext);
    const profile = apiCtx.profile;

    const {
        quittingReason,
        smokingTimesPerDay,
        smokingTimesPerWeek,
        smokingCostPerWeek,
        soberDate
    } = profile;

    const [elapsedSoberDate, setElapsedSoberDate] = useState("");
    const [moneySavedTillNow, setMoneySavedTillNow] = useState("");
    const [moneySavedPerYear, setMoneySavedPerYear] = useState("");

    const timeElapsedSoberDate = useCallback(() => {
        setInterval(() => {
            let timeDiff = Date.now() - Date.parse(soberDate);
            timeDiff = timeDiff / 1000;

            let seconds = Math.floor(timeDiff % 60);
            let secondsAsString = seconds < 10 ? "0" + seconds : seconds;

            timeDiff = Math.floor(timeDiff / 60);
            let minutes = timeDiff % 60;
            let minutesAsString = minutes < 10 ? "0" + minutes : minutes;

            timeDiff = Math.floor(timeDiff / 60);
            let hours = timeDiff % 24;
            let totalHoursAsString = hours < 10 ? "0" + hours : hours;

            timeDiff = Math.floor(timeDiff / 24);
            let days = timeDiff;

            setElapsedSoberDate(
                days + "d " +
                totalHoursAsString + "h " +
                minutesAsString + "m " +
                secondsAsString + "s");
        }, 200);
    }, [soberDate]);

    const moneySaved = useCallback(() => {
        let timeDiff = Date.now() - Date.parse(soberDate);
        let millisecondsInADay = 1000 * 60 * 60 * 24;
        let smokingCostPerDay = smokingCostPerWeek / 7;

        let moneySaved = timeDiff / millisecondsInADay * smokingCostPerDay;
        setMoneySavedTillNow(moneySaved.toFixed(2));


        let moneySavedPerYear = smokingCostPerWeek * 52;
        setMoneySavedPerYear(moneySavedPerYear.toFixed(2));
    }, [smokingCostPerWeek, soberDate]);


    useEffect(() => {
        if (Object.keys(profile).length > 0) {
            timeElapsedSoberDate();
            moneySaved();
        }
    }, [timeElapsedSoberDate, moneySaved]);

    return (
        <>
            {apiCtx.isLoading && <Progress />}

            {!apiCtx.isLoading &&
                <div>
                    <div className={styles.elapsedSoberTimeContainer}>
                        <span className={styles.smokeFreeHeading}>Time Smoke free</span>
                        <div className={styles.elapsedSoberTime}>{elapsedSoberDate}</div>
                    </div>

                    <div className={styles.moneySavedContainer}>
                        <span className={styles.moneySavedLabel}>Money saved</span>
                        <div className={styles.moneySaved}>${moneySavedTillNow}</div>
                        <br />
                        <span className={styles.moneySavedLabel}>Per year</span>
                        <div className={styles.moneySaved}>${moneySavedPerYear}</div>
                    </div><hr />

                    <div className={styles.quittingReasonContainer}>
                        <span className={styles.quittingReasonLabel}>I'm quitting for</span>
                        <div className={styles.quittingReason}>"{quittingReason}"</div>
                        <span className={styles.quittingReasonQuote}>Once you learn to quit, it becomes a habit</span>
                    </div><hr />
                </div>
            }
        </>
    )
}

export default Dashboard;