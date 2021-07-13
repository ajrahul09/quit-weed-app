import React, { useState, useContext } from "react";
import ApiContext from "../../../contexts/api-context";
import { withRouter } from 'react-router';

import Card from "../../UI/Card/Card";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import styles from './DailyLogForm.module.css';

const DailyLogForm = (props) => {

    const apiCtx = useContext(ApiContext);

    const [successMsg, setSuccessMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [cravings, setCravings] = useState(0);
    const [irritability, setIrritability] = useState(0);

    const cravingsChangeHandler = (e) => {
        setCravings(e.target.value);
    }
    const irritabilityChangeHandler = (e) => {
        setIrritability(e.target.value);
    }

    const redirectToDailyLog = () => {
        return props.history.push("/dailyLog");
        setSuccessMsg('');
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        let body = {
            cravings: cravings,
            irritability: irritability
        }
        setIsLoading(true);
        const res = await apiCtx.updateDailyLog(body);
        setIsLoading(false);

        setSuccessMsg(res);

    }

    return (
        <>
            <Card className={styles.dailyLogForm}>
                <form onSubmit={submitHandler}>
                    <Input
                        id="cravings"
                        label="Cravings"
                        type="range"
                        min="0"
                        max="10"
                        value={cravings}
                        onChange={cravingsChangeHandler}
                    />
                    <Input
                        id="irritability"
                        label="Irritability"
                        type="range"
                        min="0"
                        max="10"
                        value={irritability}
                        onChange={irritabilityChangeHandler}
                    />
                    <div className={styles.actions}>
                        <Button
                            type="submit"
                            className={styles.loading}
                            isLoading={isLoading}>
                            Submit
                        </Button>
                    </div>
                </form>
            </Card>
            {successMsg === '' ? '' :
                <div>
                    <div>{successMsg}</div>
                    <div>To see your progress,&nbsp;
                        <span onClick={redirectToDailyLog}>click here</span>
                    </div>
                </div>
            }
        </>
    )
}

export default withRouter(DailyLogForm);