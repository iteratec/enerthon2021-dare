import * as React from 'react';
import dayjs from "dayjs";

import {businessTypeMapping, timeseriesData} from "./timeseriesData"
import MultilineChart from "../components/multiline-chart/MultilineChart";

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
        return {linename: businessTypeMapping[name], linedata: dataMap[name]}
    })

    return data;

}


export const PlanDataChart = ({name, date}: PlanDataChartProps) => {
    return <div className="popupContent">
        <h3>Plan Data for {name} on {dayjs(date).format("MMMM D, YYYY")}</h3>

        <MultilineChart chartData={chartData(name, dayjs(date).add(1, "day").format("YYYY-MM-DD[T][00]:mm:ssZ"))}
                        width={600} height={200}/>

    </div>

}
