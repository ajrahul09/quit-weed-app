import React, { useState, useEffect, useReducer } from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import styles from './DailyLogChart.module.css'

const DailyLogChart = ({ dailyLog }) => {

    const dailyLogReducer = (state, action) => {

        let cravingsData = dailyLog.reduce((acc, val) => {
            acc.data.push(new Array(new Date(val.createdTime).getTime(), val.cravings));
            return acc;
        }, { name: 'Cravings', data: [] })

        let irritabilityData = dailyLog.reduce((acc, val) => {
            acc.data.push(new Array(new Date(val.createdTime).getTime(), val.irritability));
            return acc;
        }, { name: 'Irritability', data: [] })

        return [cravingsData, irritabilityData];
    }

    const [dailyLogData, dispatchDailyLogData] = useReducer(dailyLogReducer, []);

    const options = {
        chart: {
            type: 'spline'
        },
        title: {
            text: `Your Daily Progress - Keep Going! 💪 `
        },
        subtitle: {
            text: 'Add daily input to track your progress over time'
        },
        xAxis: {
            type: 'datetime',
            formatter: function() {
                return Highcharts.dateFormat('%Y-%m-%d', this.value);
            },
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: 'Scale (0 - 10)'
            },
            min: 0
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x:%e %b %H:%M} - {point.y}'
        },

        plotOptions: {
            series: {
                marker: {
                    enabled: true
                }
            }
        },

        colors: ['#6CF', '#39F', '#06C', '#036', '#000'],

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
        }
    };

    useEffect(() => {
        dispatchDailyLogData();
    }, [dispatchDailyLogData, dailyLog])

    return (
        <div className={styles.dailyLogChart_container}>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                />
        </div>
    )
}

export default DailyLogChart;