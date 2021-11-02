import * as React from 'react';
import {AreaChart} from "react-charts-d3";
import dayjs from "dayjs";

import {timeseriesData} from "./timeseriesData"

interface PlanDataChartProps {
    name: string
    date: Date
}

const chartData = (name, date) => {
    const dateObj = dayjs(date)
    const plant = timeseriesData[name];
    const timeseries = plant[date].data;

    const dataMap = {};
    Object.entries(timeseries).forEach((series) => {
        const xValue = dateObj.add(15 * (+series[0] - 1), 'minute')
        const yValues = series[1];

        Object.entries(yValues).forEach((yValue) => {
            if (yValue[0]) {
                const d = {x: xValue.format('H:mm'), y: +yValue[1]}
                const group = dataMap[yValue[0]]
                if (group) {
                    group.push(d);
                } else {
                    dataMap[yValue[0]] = [d]
                }
            }
        });
    })
    return Object.keys(dataMap).map((group) => {
        return {key: group, values: dataMap[group]}
    });
}

export const PlanDataChart = ({name, date}: PlanDataChartProps) => {

    return <div className="popupContent">
        <h3>Plan Data</h3>
        <AreaChart showGrid={false} data={chartData(name, dayjs(date).add(1, "day").format("YYYY-MM-DD[T][00]:mm:ssZ"))}/>
    </div>

}
