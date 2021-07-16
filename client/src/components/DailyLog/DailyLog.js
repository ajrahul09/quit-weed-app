import React, { useContext } from 'react';
import ApiContext from '../../contexts/api-context';
import NewDailyLog from './NewDailyLog/NewDailyLog';

import Progress from '../UI/Progress/Progress';

const DailyLog = () => {

    const apiCtx = useContext(ApiContext);
    const dailyLog = apiCtx.dailyLog.dailyLog;

    return (
        <>
            {apiCtx.isLoading && <Progress />}
            {!apiCtx.isLoading &&
                <NewDailyLog dailyLog={dailyLog} />
            }
        </>
    );
}

export default DailyLog;