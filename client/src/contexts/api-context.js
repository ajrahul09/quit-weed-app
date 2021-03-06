import React, { useState, useEffect, useContext, useCallback } from 'react';
import AuthContext from './user-context';

const API_SERVER_BASE_URL = process.env.REACT_APP_API_SERVER_BASE_URL;

const ApiContext = React.createContext({
    profile: {},
    dailyLog: {},
    images: [],
    isLoading: false,
    saveProfile: params => { },
    updateProfile: params => { },
    updateDailyLog: params => { },
    uploadImage: params => { },
    resetState: params => { }
})

export const ApiContextProvider = (props) => {

    const [profile, setProfile] = useState({});
    const [dailyLog, setDailyLog] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [images, setImages] = useState([]);

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
                await fetch(`${API_SERVER_BASE_URL}/api/profiles/${user.userId}`,
                    requestOptions);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const profileData = await response.json();
            setProfile(profileData);

            return { message: "Profile fetched successfully", ok: true };

        } catch (err) {
            return { message: err.message, ok: false };
        }

    }, [user.token, user.userId]);


    // SAVE PROFILE
    const saveProfile = async (params) => {
        let body = {
            userId: user.userId,
            quittingReason: params.quittingReason,
            smokingTimesPerDay: params.smokingTimesPerDay,
            hoursStonedPerDay: params.hoursStonedPerDay,
            smokingCostPerWeek: params.smokingCostPerWeek,
            soberDate: params.soberDate
        }

        try {
            const requestOptions = {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'auth-token': user.token,
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            };

            const response =
                await fetch(`${API_SERVER_BASE_URL}/api/profiles`,
                    requestOptions);

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setProfile(data);

            return fetchDailyLog();

        } catch (err) {
            return { message: err.message, ok: false };
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
                await fetch(`${API_SERVER_BASE_URL}/api/dailyLog/${user.userId}`,
                    requestOptions);

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setDailyLog(data);

            return { message: "Daily Log fetched successfully", ok: true };

        } catch (err) {
            return { message: err.message, ok: false };
        }

    }, [user.token, user.userId]);


    // UPDATE PROFILE
    const updateProfile = async (params) => {
        let body = {
            userId: user.userId,
            quittingReason: params.quittingReason,
            quittingReasonPhoto: params.quittingReasonPhoto,
            smokingTimesPerDay: params.smokingTimesPerDay,
            hoursStonedPerDay: params.hoursStonedPerDay,
            smokingCostPerWeek: params.smokingCostPerWeek,
            soberDate: params.soberDate
        }

        try {
            const requestOptions = {
                mode: 'cors',
                method: 'PATCH',
                headers: {
                    'auth-token': user.token,
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            };

            const response =
                await fetch(`${API_SERVER_BASE_URL}/api/profiles/${user.userId}`,
                    requestOptions);

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setProfile(data);

            return { message: "Profile updated successfully", ok: true }

        } catch (err) {
            return { message: err.message, ok: false };
        }
    }


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
                    'auth-token': user.token,
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            };

            const response =
                await fetch(`${API_SERVER_BASE_URL}/api/dailyLog/${user.userId}`,
                    requestOptions);

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setDailyLog(data);

            return { message: "Daily Log updated successfully", ok: true }

        } catch (err) {
            return { message: err.message, ok: false };
        }
    }

    // UPLOAD IMAGE
    const uploadImage = async (params) => {
        let body = {
            userId: user.userId,
            imageName: params.imageName,
            imageData: params.imageData,
            type: params.type
        }

        try {
            const requestOptions = {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'auth-token': user.token,
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            };

            const response =
                await fetch(`${API_SERVER_BASE_URL}/api/uploadImage`,
                    requestOptions);

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setImages(prevValue => {
                return [...prevValue, data];
            });

            return data;

        } catch (err) {
            return { message: err.message, ok: false };
        }
    }

    // FETCH IMAGE
    // const fetchImage =
    useCallback(async (params) => {

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
                await fetch(`${API_SERVER_BASE_URL}/api/uploadImage/` +
                    user.userId + '/' +
                    'quitting-reason',
                    requestOptions);

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setImages(prevValue => {
                return [...prevValue, data];
            });

            return data;

        } catch (err) {
            return { message: err.message, ok: false };
        }

    }, [user.userId, user.token]);

    const resetState = () => {
        setProfile('');
        setDailyLog('');
        setImages('');
        setIsLoading(false);
    }

    useEffect(() => {
        if (authCtx.isLoggedIn) {
            setIsLoading(true);

            const fetchProfile = fetchProfileHandler();
            const fetchLog = fetchDailyLog();
            // const fetchImg = fetchImage();

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
            images: images,
            isLoading: isLoading,
            saveProfile: saveProfile,
            updateProfile: updateProfile,
            updateDailyLog: updateDailyLog,
            uploadImage: uploadImage,
            resetState: resetState
        }}
        >
            {props.children}
        </ApiContext.Provider>
    )
}

export default ApiContext;