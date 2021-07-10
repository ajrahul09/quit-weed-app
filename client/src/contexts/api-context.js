import React, { useState, useEffect, useContext, useCallback } from 'react';
import AuthContext from './user-context';

const ApiContext = React.createContext({
    profile: {},
    dailyLog: {},
    isLoading: false,
    saveProfile: (params, callback) => {}
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
        }
    }, [authCtx.isLoggedIn])

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


    // SAVE PROFILE DATA
    const saveProfile = async (params, callback) => {
        let body = {
            userId: user.userId,
            quittingReason: params.quittingReason,
            smokingTimesPerDay: params.smokingTimesPerDay,
            smokingTimesPerWeek: params.smokingTimesPerWeek,
            smokingCostPerWeek: params.smokingCostPerWeek,
            soberDate: params.soberDate
        }

        console.log(body);
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

            // callback();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <ApiContext.Provider value={{
            profile: profile,
            dailyLog: dailyLog,
            isLoading: isLoading,
            saveProfile: saveProfile
        }}
        >
            {props.children}
        </ApiContext.Provider>
    )
}

export default ApiContext;