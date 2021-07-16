import React, { useState, useContext } from "react";
import ApiContext from "../../../contexts/api-context";
import { withRouter } from 'react-router';

import Card from "../../UI/Card/Card";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import styles from './DailyLogForm.module.css';

const DailyLogForm = (props) => {

    const apiCtx = useContext(ApiContext);

    const [isLoading, setIsLoading] = useState(false);

    const [cravings, setCravings] = useState(0);
    const [irritability, setIrritability] = useState(0);
    const [anxiety, setAnxiety] = useState(0);
    const [insomnia, setInsomnia] = useState(0);
    const [appetiteLoss, setAppetiteLoss] = useState(0);
    const [moodSwings, setMoodSwings] = useState(0);
    const [depression, setDepression] = useState(0);
    const [coldSweats, setColdSweats] = useState(0);
    const [motivation, setMotivation] = useState(0);
    const [happiness, setHappiness] = useState(0);
    const [confidence, setConfidence] = useState(0);

    const cravingsChangeHandler = (e) => {
        setCravings(e.target.value);
    }
    const irritabilityChangeHandler = (e) => {
        setIrritability(e.target.value);
    }
    const anxietyChangeHandler = (e) => {
        setAnxiety(e.target.value);
    }
    const insomniaChangeHandler = (e) => {
        setInsomnia(e.target.value);
    }
    const appetiteLossChangeHandler = (e) => {
        setAppetiteLoss(e.target.value);
    }
    const moodSwingsChangeHandler = (e) => {
        setMoodSwings(e.target.value);
    }
    const depressionChangeHandler = (e) => {
        setDepression(e.target.value);
    }
    const coldSweatsChangeHandler = (e) => {
        setColdSweats(e.target.value);
    }
    const motivationChangeHandler = (e) => {
        setMotivation(e.target.value);
    }
    const happinessChangeHandler = (e) => {
        setHappiness(e.target.value);
    }
    const confidenceChangeHandler = (e) => {
        setConfidence(e.target.value);
    }

    const redirectToDailyLog = () => {
        return props.history.push("/dailyLog");
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        let body = {
            cravings: cravings,
            irritability: irritability,
            anxiety: anxiety,
            insomnia: insomnia,
            appetiteLoss: appetiteLoss,
            moodSwings: moodSwings,
            depression: depression,
            coldSweats: coldSweats,
            motivation: motivation,
            happiness: happiness,
            confidence: confidence
        }
        setIsLoading(true);
        const response = await apiCtx.updateDailyLog(body);
        setIsLoading(false);

        if (!response.ok) {
            return;
        }

        redirectToDailyLog(); 

    }

    return (
        <>
            <div className={styles.dailyLogFormHeadingDiv}>
                <h1 className={styles.dailyLogFormHeading}>
                    Daily Log
                </h1>
                <p className={styles.dailyLogFormSubHeading}>
                    Add daily logs to keep track
                    of your cravings over time.
                </p>
            </div>

            <Card className={styles.dailyLogForm}>
                <span className={styles.formlegend}>
                    * on a scale of 0 - 10, with 10 being the maximum</span>
                <br />
                <form onSubmit={submitHandler}>
                    <Input
                        id="cravings"
                        label="Cravings"
                        type="range"
                        min="0"
                        max="10"
                        value={cravings}
                        displayMinMax={true}
                        onChange={cravingsChangeHandler}
                    />
                    <Input
                        id="irritability"
                        label="Irritability"
                        type="range"
                        min="0"
                        max="10"
                        value={irritability}
                        displayMinMax={true}
                        onChange={irritabilityChangeHandler}
                    />
                    <Input
                        id="anxiety"
                        label="Anxiety"
                        type="range"
                        min="0"
                        max="10"
                        value={anxiety}
                        displayMinMax={true}
                        onChange={anxietyChangeHandler}
                    />
                    <Input
                        id="insomnia"
                        label="Insomnia"
                        type="range"
                        min="0"
                        max="10"
                        value={insomnia}
                        displayMinMax={true}
                        onChange={insomniaChangeHandler}
                    />
                    <Input
                        id="appetiteLoss"
                        label="Appetite Loss"
                        type="range"
                        min="0"
                        max="10"
                        value={appetiteLoss}
                        displayMinMax={true}
                        onChange={appetiteLossChangeHandler}
                    />
                    <Input
                        id="moodSwings"
                        label="Mood Swings"
                        type="range"
                        min="0"
                        max="10"
                        value={moodSwings}
                        displayMinMax={true}
                        onChange={moodSwingsChangeHandler}
                    />
                    <Input
                        id="depression"
                        label="Depression"
                        type="range"
                        min="0"
                        max="10"
                        value={depression}
                        displayMinMax={true}
                        onChange={depressionChangeHandler}
                    />
                    <Input
                        id="coldSweats"
                        label="Cold Sweats"
                        type="range"
                        min="0"
                        max="10"
                        value={coldSweats}
                        displayMinMax={true}
                        onChange={coldSweatsChangeHandler}
                    />
                    <br /><hr /><br />
                    <Input
                        id="confidence"
                        label="Confidence"
                        type="range"
                        min="0"
                        max="10"
                        value={confidence}
                        displayMinMax={true}
                        onChange={confidenceChangeHandler}
                    />
                    <Input
                        id="happiness"
                        label="Happiness"
                        type="range"
                        min="0"
                        max="10"
                        value={happiness}
                        displayMinMax={true}
                        onChange={happinessChangeHandler}
                    />
                    <Input
                        id="motivation"
                        label="Motivation"
                        type="range"
                        min="0"
                        max="10"
                        value={motivation}
                        displayMinMax={true}
                        onChange={motivationChangeHandler}
                    />
                    <br />
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
        </>
    )
}

export default withRouter(DailyLogForm);