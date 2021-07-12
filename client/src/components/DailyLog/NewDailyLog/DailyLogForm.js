import React, {useState, useContext} from "react";
import ApiContext from "../../../contexts/api-context";

import Card from "../../UI/Card/Card";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import styles from './DailyLogForm.module.css';

const DailyLogForm = () => {

    const apiCtx = useContext(ApiContext);

    const [cravings, setCravings] = useState(0);
    const [irritability, setIrritability] = useState(0);

    const cravingsChangeHandler = (e) => {
        setCravings(e.target.value);
    }
    const irritabilityChangeHandler = (e) => {
        setIrritability(e.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        let body = {
            cravings: cravings,
            irritability: irritability
        }
        apiCtx.updateDailyLog(body);
    }

    return (
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
                    <Button type="submit" className={styles.btn}>
                        Submit
                    </Button>
                </div>
            </form>
        </Card>
    )
}

export default DailyLogForm;