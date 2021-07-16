import React from 'react';

import styles from './LandingPage.module.css';

const LandingPage = () => {
    return (
        <div className={styles.landingPage_container}>
            <div className={styles.image_div}></div>
            <div className={styles.welcome_info_div}>
                <h1 className={styles.welcome_heading}>
                    👋 Welcome to QuitWeed.org
                </h1>
                <p className={styles.welcome_message}>
                    Our goal is to bring attention to the negative impacts
                    of marijuana on health, mental clarity, appetite, motivation, and more.
                    We are not here to make a moral statement on marijuana usage;
                    plenty of people are able to responsibly enjoy the drug.
                    For those of us who have become addicted, however,
                    the drug quickly takes control of numerous aspects of life.
                    <br /><br />
                    QuitWeed.org is a tool that tracks your journey into sobriety,
                    while monitoring health and emotional improvements along the way.
                    <br /><br />
                    To track these improvements, fill out the survey on the right and
                    check-in to the website daily. In as little as three days
                    you will see withdrawal symptoms recede,
                    and soon you will have your old life back.</p>
            </div>
        </div>
    )
}

export default LandingPage;