import * as React from 'react';
import dayjs from "dayjs";

import {businessTypeColorMapping, businessTypeMapping, timeseriesData} from "./timeseriesData"
import MultilineChart from "../components/multiline-chart/MultilineChart";

interface PlanDataChartProps {
    name: string
    date: Date
    width: number
}

const chartData = (name, date) => {
    const dateObj = dayjs(date)
    const plant = timeseriesData[name];
    const timeseries = plant[date].data;

    const dataMap = {};
    Object.entries(timeseries).forEach((series) => {
        const xValue = dateObj.add(15 * (+series[0] - 1), 'minute');
        const yValues = series[1];

        Object.entries(yValues).forEach((yValue) => {
            if (yValue[0]) {
                const d = {date: xValue.format('HH:mm'), value: +yValue[1]}
                const group = dataMap[yValue[0]]
                if (group) {
                    group.push(d);
                } else {
                    dataMap[yValue[0]] = [d]
                }
            }
        });
    })

    const linenames = Object.keys(dataMap);

    const data = linenames.map((name, index) => {
        return {linename: businessTypeMapping[name], linecolor: businessTypeColorMapping[name], linedata: dataMap[name]}
    })

    return data;

}


export const PlanDataChart = ({name, date, width}: PlanDataChartProps) => {
    return <div className="popupContent">
        <h5>Plan Data for {name}</h5>

        <MultilineChart chartData={chartData(name, dayjs(date).add(1, "day").format("YYYY-MM-DD[T][00]:mm:ssZ"))}
                        width={width} height={200}/>

    </div>

}
