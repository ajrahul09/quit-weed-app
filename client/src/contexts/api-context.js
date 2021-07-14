import React, { useState, useEffect, useContext, useCallback } from 'react';
import AuthContext from './user-context';

const ApiContext = React.createContext({
    profile: {},
    dailyLog: {},
    isLoading: false,
    saveProfile: (params) => { },
    updateDailyLog: (params) => { }
})

export const ApiContextProvider = (props) => {

    const [profile, setProfile] = useState({});
    const [dailyLog, setDailyLog] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const authCtx = useContext(AuthContext);
    const user = authCtx.user;

    // FETCH PROFILE
    const fetchProfileHandler = useCallback(async () => {

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

    }, [user.token, user.userId]);


    // SAVE PROFILE
    const saveProfile = async (params) => {
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

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setProfile(data);

            return fetchDailyLog();

        } catch (err) {
            return {message: err.message, ok:false};
        }
    }


    // FETCH DAILYLOG
    const fetchDailyLog = useCallback(async () => {

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

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setDailyLog(data);

            return {message: "Daily Log fetched successfully", ok: true};

        } catch (err) {
            return {message: err.message, ok:false};
        }

    }, [user.token, user.userId]);


    // UPDATE DAILY LOG
    const updateDailyLog = async (params) => {
        let body = {
            cravings: params.cravings,
            irritability: params.irritability,
            anxiety: params.anxiety,
            insomnia: params.insomnia,
            appetiteLoss: params.appetiteLoss,
            moodSwings: params.moodSwings,
            depression: params.depression,
            coldSweats: params.coldSweats,
            motivation: params.motivation,
            happiness: params.happiness,
            confidence: params.confidence
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

            return {message: "Daily Log updated successfully", ok: true}

        } catch (err) {
            return {message: err.message, ok:false};
        }
    }

    useEffect(() => {
        if (authCtx.isLoggedIn) {
            setIsLoading(true);

            const fetchProfile = fetchProfileHandler();
            const fetchLog = fetchDailyLog();
            
            Promise.all([fetchProfile, fetchLog])
            .then(values => {
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
            });
        }
    }, [authCtx.isLoggedIn, fetchDailyLog, fetchProfileHandler])

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