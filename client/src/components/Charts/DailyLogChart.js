import React, { useEffect, useReducer, useContext, useCallback } from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';

import styles from './DailyLogChart.module.css'
import ApiContext from "../../contexts/api-context";
import Progress from "../UI/Progress/Progress";

const DailyLogChart = () => {

    const apiCtx = useContext(ApiContext);
    const dailyLog = apiCtx.dailyLog.dailyLog;

    const dailyLogReducer = (state, action) => {

        let cravingsData = dailyLog.reduce((acc, val) => {
            acc.data.push([new Date(val.createdTime).getTime(), val.cravings]);
            return acc;
        }, { name: 'Cravings', data: [] })

        let irritabilityData = dailyLog.reduce((acc, val) => {
            acc.data.push([new Date(val.createdTime).getTime(), val.irritability]);
            return acc;
        }, { name: 'Irritability', data: [] })

        let anxietyData = dailyLog.reduce((acc, val) => {
            acc.data.push([new Date(val.createdTime).getTime(), val.anxiety]);
            return acc;
        }, { name: 'Anxiety', data: [] })

        let insomniaData = dailyLog.reduce((acc, val) => {
            acc.data.push([new Date(val.createdTime).getTime(), val.insomnia]);
            return acc;
        }, { name: 'Insomnia', data: [] })

        let appetiteLossData = dailyLog.reduce((acc, val) => {
            acc.data.push([new Date(val.createdTime).getTime(), val.appetiteLoss]);
            return acc;
        }, { name: 'Appetite Loss', data: [] })

        let moodSwingsData = dailyLog.reduce((acc, val) => {
            acc.data.push([new Date(val.createdTime).getTime(), val.moodSwings]);
            return acc;
        }, { name: 'Mood swings', data: [] })

        let depressionData = dailyLog.reduce((acc, val) => {
            acc.data.push([new Date(val.createdTime).getTime(), val.depression]);
            return acc;
        }, { name: 'Depression', data: [] })

        let coldSweatsData = dailyLog.reduce((acc, val) => {
            acc.data.push([new Date(val.createdTime).getTime(), val.coldSweats]);
            return acc;
        }, { name: 'Cold Sweats', data: [] })

        return [cravingsData, irritabilityData, anxietyData, insomniaData, appetiteLossData, moodSwingsData, depressionData, coldSweatsData];
    }

    const dailyLogAdditionalReducer = (state, action) => {

        let motivationData = dailyLog.reduce((acc, val) => {
            acc.data.push([new Date(val.createdTime).getTime(), val.motivation]);
            return acc;
        }, { name: 'Motivation', data: [] })

        let happinessData = dailyLog.reduce((acc, val) => {
            acc.data.push([new Date(val.createdTime).getTime(), val.happiness]);
            return acc;
        }, { name: 'Happiness', data: [] })

        let confidenceData = dailyLog.reduce((acc, val) => {
            acc.data.push([new Date(val.createdTime).getTime(), val.confidence]);
            return acc;
        }, { name: 'Confidence', data: [] })

        return [motivationData, happinessData, confidenceData];

    }

    const [dailyLogData, dispatchDailyLogData] = useReducer(dailyLogReducer, []);
    const [dailyLogAdditionalData, dispatchDailyLogAdditionalData] = useReducer(dailyLogAdditionalReducer, []);

    const options = {
        chart: {
            type: 'spline'
        },
        title: {
            text: `Daily Cravings - Stop them! ✋ `
        },
        subtitle: {
            text: 'Add daily input to track your progress over time'
        },
        xAxis: {
            type: 'datetime',
            labels: {
                formatter: function () {
                    return Highcharts.dateFormat('%e %b \'%y', this.value);
                }
            },
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: 'Daily Cravings'
            },
            min: 0
        },
        tooltip: {
            formatter: function() {
                return tooltipFormatter(this);
            }
        },

        plotOptions: {
            series: {
                marker: {
                    enabled: true
                }
            }
        },

        colors: ["#7cb5ec", "#434348", "#90ed7d", "#f7a35c", "#8085e9", "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"],

        // Define the data points. All series have a dummy year
        // of 1970/71 in order to be compared on the same x axis. Note
        // that in JavaScript, months start at 0 for January, 1 for February etc.
        series: dailyLogData,

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    plotOptions: {
                        series: {
                            marker: {
                                radius: 2.5
                            }
                        }
                    }
                }
            }]
        },

        caption: {
            text: `<b>What this graph indicates?</b><br />
            It tracks your daily progress of quitting
            smoking over time on attributes such as
            like cravings, irritability, etc. <br />
            The Y-axis indicates your 
            daily urge on a scale of 0 - 10, 
            with 10 being the maximum. The X-axis
            denotes the timestamp.`
        }
    };

    const options1 = {
        chart: {
            type: 'spline'
        },
        title: {
            text: `Daily Motivation - Keep going! 💪 `
        },
        subtitle: {
            text: 'Add daily input to track your progress over time'
        },
        xAxis: {
            type: 'datetime',
            labels: {
                formatter: function () {
                    return Highcharts.dateFormat('%e %b \'%y', this.value);
                }
            },
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: 'Daily Motivation'
            },
            min: 0
        },
        tooltip: {
            formatter: function() {
                return tooltipFormatter(this);
            }
        },

        plotOptions: {
            series: {
                marker: {
                    enabled: true
                }
            }
        },

        colors: ["#f7a35c", "#8085e9", "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"],

        // Define the data points. All series have a dummy year
        // of 1970/71 in order to be compared on the same x axis. Note
        // that in JavaScript, months start at 0 for January, 1 for February etc.
        series: dailyLogAdditionalData,

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    plotOptions: {
                        series: {
                            marker: {
                                radius: 2.5
                            }
                        }
                    }
                }
            }]
        },

        caption: {
            text: `<b>What this graph indicates?</b><br />
            It tracks your daily progress of quitting
            smoking over time on attributes such as
            like motivation, happiness, etc. <br />
            The Y-axis indicates your 
            daily motivation on a scale of 0 - 10, 
            with 10 being the maximum. The X-axis
            denotes the timestamp.`
        }
    };

    const tooltipFormatter = (val) => {
            let date = new Date(val.x);
            date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
            date = date.toISOString();
            date = date.substring(0, 10) + ' ' + date.substring(11, 19);

            return `<b>${val.series.name} - ${val.y}</b><br />${date}`;
    }

    function changeHighChartsPosition() {
        var el = document.getElementsByClassName("highcharts-container")[0];
        if (el) {
            el.style.position = "";

            Highcharts.charts.forEach(function (chart) {
                if (chart)
                    chart.reflow();
            });
        }
    }

    const customizeHighChart = useCallback(() => {
        if (!apiCtx.isLoading && dailyLog && dailyLog.length === 0) {
            NoDataToDisplay(Highcharts);
            Highcharts.setOptions({
                lang: {
                    noData: 'Add DailyLog to see your progress here'
                },
                noData: {
                    style: {
                        fontWeight: 'bold',
                        fontSize: '15px',
                        color: 'red'
                    }
                },
            });
        }
    }, [apiCtx.isLoading, dailyLog]);

    customizeHighChart();
    changeHighChartsPosition();

    useEffect(() => {
        customizeHighChart();
        changeHighChartsPosition();
        if (!apiCtx.isLoading && dailyLog && dailyLog.length > 0) {
            dispatchDailyLogData();
            dispatchDailyLogAdditionalData();
        }
    }, [dispatchDailyLogData, dispatchDailyLogAdditionalData, 
        dailyLog, apiCtx.isLoading, customizeHighChart
    ])

    return (
        <>
            {apiCtx.isLoading && <Progress />}
            {!apiCtx.isLoading &&
                <>
                    <div className={styles.dailyLogChart_headingDiv}>
                        <h1 className={styles.dailyLogChart_heading}>
                            Your Daily Progress
                        </h1>
                        <p className={styles.dailyLogChart_subHeading}>
                            Monitor your cravings and motivation regulary to develop good habits!
                        </p>
                    </div>
                    <div className={styles.dailyLogChart_container}>
                        {!apiCtx.isLoading && dailyLog &&
                            <HighchartsReact
                                containerProps={{
                                    style: {
                                        maxWidth: "50rem", margin: "auto"
                                    }
                                }}
                                highcharts={Highcharts}
                                options={options}
                            />}
                    </div>
                    <div className={styles.dailyLogChart_container}>
                        <HighchartsReact
                            containerProps={{
                                style: {
                                    maxWidth: "50rem", margin: "auto"
                                }
                            }}
                            highcharts={Highcharts}
                            options={options1}
                        />
                    </div>
                </>
            }
        </>
    )
}

export default DailyLogChart;