import * as React from "react";
import {useEffect} from "react";
import dayjs from "dayjs";

import {LineChart} from "./LineChart";

import {redispatchData, RedispatchData} from "./redispatchData";

type FlattenedElement = {nbName: string, q: number, rd: number};

const flatten = (rdData: RedispatchData): FlattenedElement[] => {
    return Object.keys(rdData.data).map(q => {
        return {nbName: rdData.nbName, q: Number(q), rd: rdData.data[q]}
    })
}

interface RdChartProps {
    day: Date
}

export const RdChart = ({day}: RdChartProps) => {

    useEffect(() => {
        const dayStr = dayjs(day).format("YYYY-MM-DD");
        const data = redispatchData.filter((d: {date: string}) => d.date == dayStr)
            .reduce((_flattened, rd) => {
                return [..._flattened, ...flatten(rd)]
            }, [])
        LineChart(data, {
            svgSelector: ".rdchart",
            x: (d: any) => d.q,
            y: (d: any) => d.rd,
            z: (d: any) => d.nbName
        })
    })

    return <div className="rdchart">
    </div>
}