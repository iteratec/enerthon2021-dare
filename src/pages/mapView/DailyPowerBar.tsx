import * as React from "react";
import {QuarterData, quarters} from "./types";

import "./DailyPowerBar.scss";

export interface DailyPowerBarProps {
    data: Partial<QuarterData>;
    className?: string;
    isEmptyWhenZero?: boolean;
}

const isFilled = (data: number | undefined, isEmptyWhenZero?: boolean) => {
    if (isEmptyWhenZero) {
        return !!data;
    } else {
        return typeof data !== "undefined";
    }
};

export const DailyPowerBar: React.FC<DailyPowerBarProps> = (props) => {
    return (
        <div className={`daily-power-bar ${props.className ? props.className : ""}`}>
            {quarters.map((key) => {
                return <span key={key}
                             className={`power-bar-item ${key} ${isFilled(props.data[key], props.isEmptyWhenZero) ? "filled" : ""}`}/>;
            })}
        </div>
    );
};