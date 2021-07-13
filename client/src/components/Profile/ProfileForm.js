import React, { useState, useContext } from 'react';

import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import ApiContext from '../../contexts/api-context';

import classes from './ProfileForm.module.css'

const ProfileForm = (props) => {

    const apiCtx = useContext(ApiContext);

    const [quittingReason, setQuittingReason] = useState('');
    const [smokingTimesPerDay, setSmokingTimesPerDay] = useState(0);
    const [smokingTimesPerWeek, setSmokingTimesPerWeek] = useState(0);
    const [smokingCostPerWeek, setSmokingCostPerWeek] = useState(0);
    const [soberDate, setSoberDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    let dateToday = new Date().toISOString().split(".")[0];

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
        const response = await apiCtx.saveProfile(params);
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

    // const navigateToDashboard = () => {
    //     return props.history.push("/dashboard");
    // }

    return (
        <div className={classes.profileForm}>
            <form onSubmit={submitHandler}>
                <Input
                    id="quittingReason"
                    label="Quitting Reason"
                    type="text"
                    onChange={quittingReasonHandler}
                />
                <Input
                    id="smokingTimesPerDay"
                    label="Smoking Times Per Day"
                    type="number"
                    onChange={smokingTimesPerDayHandler}
                />
                <Input
                    id="smokingTimesPerWeek"
                    label="Smoking Times Per Week"
                    type="number"
                    onChange={smokingTimesPerWeekHandler}
                />
                <Input
                    id="smokingCostPerWeek"
                    label="Smoking Cost Per Week"
                    type="number"
                    onChange={smokingCostPerWeekHandler}
                />
                <Input
                    id="soberDate"
                    label="Sober Date"
                    type="datetime-local"
                    max={dateToday}
                    onChange={soberDateHandler}
                />
                <br />
                <div className={classes.actions}>
                    <Button
                        type="submit"
                        className={classes.btn}
                        isLoading={isLoading}>
                        Submit Profile
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ProfileForm;