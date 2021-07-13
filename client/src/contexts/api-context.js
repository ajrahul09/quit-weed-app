import React, { useState, useEffect, useContext, useCallback } from 'react';
import AuthContext from './user-context';

const ApiContext = React.createContext({
    profile: {},
    dailyLog: {},
    isLoading: false,
    saveProfile: (params, callback) => {},
    updateDailyLog: (params, callback) => {}
})

export const ApiContextProvider = (props) => {

    const [profile, setProfile] = useState({});
    const [dailyLog, setDailyLog] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const authCtx = useContext(AuthContext);
    const user = authCtx.user;

    useEffect(() => {
        if (authCtx.isLoggedIn) {
            fetchProfileHandler();
            fetchDailyLog();
        }
    }, [authCtx.isLoggedIn])


    // FETCH PROFILE
    const fetchProfileHandler = useCallback(async () => {

        setIsLoading(true);

        try {
            const requestOptions = {
                mode: 'cors',
                method: 'GET',
                headers: {
                    'auth-token': user.token,
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                }
            };

            const response =
                await fetch('http://localhost:3000/api/profiles/' + user.userId,
                    requestOptions);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const profileData = await response.json();
            setProfile(profileData);

        } catch (err) {
            console.log(err);
        }
        setIsLoading(false);

    }, [user.token, user.userId]);


    // SAVE PROFILE
    const saveProfile = async (params, callback) => {
        let body = {
            userId: user.userId,
            quittingReason: params.quittingReason,
            smokingTimesPerDay: params.smokingTimesPerDay,
            smokingTimesPerWeek: params.smokingTimesPerWeek,
            smokingCostPerWeek: params.smokingCostPerWeek,
            soberDate: params.soberDate
        }

        try {
            const requestOptions = {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            };

            const response =
                await fetch('http://localhost:3000/api/profiles',
                    requestOptions);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();

            setProfile(data);

            fetchDailyLog();

            // callback();
        } catch (err) {
            console.log(err);
        }
    }


    // FETCH DAILYLOG
    const fetchDailyLog = useCallback(async () => {

        setIsLoading(true);

        try {
            const requestOptions = {
                mode: 'cors',
                method: 'GET',
                headers: {
                    'auth-token': user.token,
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                }
            };

            const response =
                await fetch('http://localhost:3000/api/dailyLog/' + user.userId,
                    requestOptions);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const dailyLogData = await response.json();
            setDailyLog(dailyLogData);
            console.log(dailyLog);

        } catch (err) {
            console.log(err);
        }
        setIsLoading(false);

    }, [user.token, user.userId]);


    // UPDATE DAILY LOG
    const updateDailyLog = async (params, callback) => {
        let body = {
            cravings: params.cravings,
            irritability: params.irritability
        }

        try {
            const requestOptions = {
                mode: 'cors',
                method: 'PATCH',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            };

            const response =
                await fetch('http://localhost:3000/api/dailyLog/' + user.userId,
                    requestOptions);

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setDailyLog(data);

            // callback();

            return "Daily Log updated successfully";
        } catch (err) {
            return err.message;
        }
    }

    return (
        <ApiContext.Provider value={{
            profile: profile,
            dailyLog: dailyLog,
            isLoading: isLoading,
            saveProfile: saveProfile,
            updateDailyLog: updateDailyLog
        }}
        >
            {props.children}
        </ApiContext.Provider>
    )
}

export default ApiContext;