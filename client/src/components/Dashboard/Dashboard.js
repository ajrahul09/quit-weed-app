import React, { useState, useEffect, useCallback } from 'react'


const Dashboard = (props) => {

    const { soberDate } = props.profile;
    const [elapsedSoberDate, setElapsedSoberDate] = useState("");

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
        }, 1000);
    }, [soberDate]);

    useEffect(() => {
        timeElapsedSoberDate();
    }, [timeElapsedSoberDate]);

    return (
        <>
            {elapsedSoberDate}<br />
            <h1>Welcome back!</h1>
        </>
    )
}

export default Dashboard;