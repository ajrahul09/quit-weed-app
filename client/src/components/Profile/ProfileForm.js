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
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');

    const [quittingReasonPhoto, setQuittingReasonPhoto] = useState('');
    const [imageUploaded, setImageUploaded] = useState(0);

    const submitHandler = async (event) => {
        event.preventDefault();
        setMessage('');
        
        let params = {
            quittingReason: quittingReason,
            quittingReasonPhoto: quittingReasonPhoto,
            smokingTimesPerDay: smokingTimesPerDay,
            smokingTimesPerWeek: smokingTimesPerWeek,
            smokingCostPerWeek: smokingCostPerWeek,
            soberDate: soberDate
        }

        setIsLoading(true);
        let response = {};
        if (profile.soberDate && profile.soberDate && '' !== profile.soberDate) {
            response = await apiCtx.updateProfile(params);
        } else {
            response = await apiCtx.saveProfile(params);
        }
        setIsLoading(false);

        if (!response.ok) {
            setIsError(true);
        }

        setMessage(response.message);

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

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const onImageChange = async event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];

            let base64Img = await toBase64(img)

            setQuittingReasonPhoto(base64Img);

            let imageObj = {
                imageName: img.name,
                imageData: base64Img,
                type: 'quitting-reason'
            }

            setImageUploaded(1);
            await apiCtx.uploadImage(imageObj);
            setImageUploaded(2);

        }
    };

    useEffect(() => {
        if (profile) {
            setQuittingReason(profile.quittingReason);
            setSmokingTimesPerDay(profile.smokingTimesPerDay);
            setSmokingTimesPerWeek(profile.smokingTimesPerWeek);
            setSmokingCostPerWeek(profile.smokingCostPerWeek);
            setSoberDate(profile.soberDate ? dateFormatter(new Date(profile.soberDate)) : '');
        }
        return () => {
            setQuittingReason('')
            setSmokingTimesPerDay(0);
            setSmokingTimesPerWeek(0);
            setSmokingCostPerWeek(0);
            setSoberDate('');
        }
    }, [profile])

    let msgClass = styles.successMsg;
    if (isError) {
        msgClass = styles.failureMsg;
    }

    return (
        <>
            <div className={styles.profileFormHeadingDiv}>
                <h1 className={styles.profileFormHeading}>
                    Update Profile
                </h1>
            </div>

            <div className={`${msgClass} ${styles.messageDiv}`}>
                <p className={styles.message}>{message}</p>
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
                            id="quittingReasonPhoto"
                            label="Quitting Reason Photo"
                            type="file"
                            onChange={onImageChange}
                        />
                        <div className={styles.imageUploadedDivContainer}>
                            <div className={styles.imageUploadedDiv}>
                                <img alt="quitting-smoking"
                                    className={styles.imageUploadedThumbnail}
                                    src={quittingReasonPhoto} />
                            </div>
                            <div className={styles.imageUploadedMsg}>
                                {imageUploaded === 1 && <span>Image Uploading...</span>}
                                {imageUploaded === 2 && <span>Image Uploaded</span>}
                            </div>
                        </div>
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
                            max={dateFormatter(new Date())}
                            value={soberDate || ''}
                            onChange={soberDateHandler}
                        />
                        <br />
                        <div className={styles.actions}>
                            <Button
                                type="submit"
                                className={styles.btn}
                                isLoading={isLoading}
                                disabled={imageUploaded === 1 ? true : false}>
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