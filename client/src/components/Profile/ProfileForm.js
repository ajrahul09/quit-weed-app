import React, { useState, useContext, useEffect } from 'react';

import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import ApiContext from '../../contexts/api-context';

import styles from './ProfileForm.module.css'
import Card from '../UI/Card/Card';

const ProfileForm = (props) => {

    const apiCtx = useContext(ApiContext);
    const profile = apiCtx.profile;

    const [quittingReason, setQuittingReason] = useState('');
    const [smokingTimesPerDay, setSmokingTimesPerDay] = useState(0);
    const [smokingTimesPerWeek, setSmokingTimesPerWeek] = useState(0);
    const [smokingCostPerWeek, setSmokingCostPerWeek] = useState(0);
    const [soberDate, setSoberDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const submitHandler = async (event) => {
        event.preventDefault();
        let params = {
            quittingReason: quittingReason,
            smokingTimesPerDay: smokingTimesPerDay,
            smokingTimesPerWeek: smokingTimesPerWeek,
            smokingCostPerWeek: smokingCostPerWeek,
            soberDate: soberDate
        }

        setIsLoading(true);
        let response = {};
        if (profile.soberDate && profile.soberDate && '' != profile.soberDate) {
            response = await apiCtx.updateProfile(params);
        } else {
            response = await apiCtx.saveProfile(params);
        }
        setIsLoading(false);

        if (!response.ok) {
            return response.message;
        }

    }

    const quittingReasonHandler = (event) => {
        setQuittingReason(event.target.value);
    };

    const smokingTimesPerDayHandler = (event) => {
        setSmokingTimesPerDay(event.target.value);
    };

    const smokingTimesPerWeekHandler = (event) => {
        setSmokingTimesPerWeek(event.target.value);
    };

    const smokingCostPerWeekHandler = (event) => {
        setSmokingCostPerWeek(event.target.value);
    };

    const soberDateHandler = (event) => {
        setSoberDate(event.target.value);
    };

    const dateFormatter = (date) => {
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        return date.toISOString().slice(0, 16);
    }

    useEffect(() => {
        if (profile) {
            setQuittingReason(profile.quittingReason);
            setSmokingTimesPerDay(profile.smokingTimesPerDay);
            setSmokingTimesPerWeek(profile.smokingTimesPerWeek);
            setSmokingCostPerWeek(profile.smokingCostPerWeek);
            setSoberDate(profile.soberDate ? dateFormatter(new Date(profile.soberDate)) : '');
        }
    }, [profile])

    return (
        <>
            <div className={styles.profileFormHeadingDiv}>
                <h1 className={styles.profileFormHeading}>
                    Update Profile
                </h1>
            </div>
            <Card className={styles.profileForm}>
                <div>
                    <form onSubmit={submitHandler}>
                        <Input
                            id="quittingReason"
                            label="Quitting Reason"
                            type="text"
                            value={quittingReason || ''}
                            onChange={quittingReasonHandler}
                        />
                        <Input
                            id="smokingTimesPerDay"
                            label="Smoking Times Per Day"
                            type="number"
                            value={smokingTimesPerDay || 0}
                            onChange={smokingTimesPerDayHandler}
                        />
                        <Input
                            id="smokingTimesPerWeek"
                            label="Smoking Times Per Week"
                            type="number"
                            value={smokingTimesPerWeek || 0}
                            onChange={smokingTimesPerWeekHandler}
                        />
                        <Input
                            id="smokingCostPerWeek"
                            label="Smoking Cost Per Week"
                            type="number"
                            value={smokingCostPerWeek || 0}
                            onChange={smokingCostPerWeekHandler}
                        />
                        <Input
                            id="soberDate"
                            label="Sober Date"
                            type="datetime-local"
                            max={dateFormatter(new Date)}
                            value={soberDate || ''}
                            onChange={soberDateHandler}
                        />
                        <br />
                        <div className={styles.actions}>
                            <Button
                                type="submit"
                                className={styles.btn}
                                isLoading={isLoading}>
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>
            </Card>
        </>
    )
}

export default ProfileForm;