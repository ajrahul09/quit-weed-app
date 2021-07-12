import React, { useContext } from 'react';
import ApiContext from '../../contexts/api-context';
import NewDailyLog from './NewDailyLog/NewDailyLog';
import DailyLogChart from '../Charts/DailyLogChart';

import styles from './DailyLog.module.css';
import Card from '../UI/Card/Card';

const DailyLog = () => {

    const apiCtx = useContext(ApiContext);
    const dailyLog = apiCtx.dailyLog.dailyLog;

    return (
        <>
            {apiCtx.isLoading && <p>Loading...</p>}
            {!apiCtx.isLoading &&
                <NewDailyLog dailyLog={dailyLog} />
            }
            {!apiCtx.isLoading && dailyLog && dailyLog.length > 0 &&
                <DailyLogChart dailyLog={dailyLog} />
            }
        </>
    );
}

export default DailyLog;