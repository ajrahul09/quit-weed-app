import React, { useState, useContext } from 'react';

import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/user-context';

import classes from './ProfileForm.module.css'

const ProfileForm = (props) => {

    const authCtx = useContext(AuthContext);
    const user = authCtx.user;

    const [quittingReason, setQuittingReason] = useState('');
    const [smokingTimesPerDay, setSmokingTimesPerDay] = useState(0);
    const [smokingTimesPerWeek, setSmokingTimesPerWeek] = useState(0);
    const [smokingCostPerWeek, setSmokingCostPerWeek] = useState(0);
    const [soberDate, setSoberDate] = useState('');

    let dateToday = new Date().toISOString().split(".")[0];

    const submitHandler = async (event) => {
        event.preventDefault();
        let body = {
            userId: user.userId,
            quittingReason: quittingReason,
            smokingTimesPerDay: smokingTimesPerDay,
            smokingTimesPerWeek: smokingTimesPerWeek,
            smokingCostPerWeek: smokingCostPerWeek,
            soberDate: soberDate
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

            props.submitProfile(data);
        } catch (err) {
            console.log(err);
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
                    <Button type="submit" className={classes.btn}>
                        Submit Profile
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ProfileForm;