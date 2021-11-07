import * as React from 'react';
import {useState, useEffect} from "react";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";

import "react-datepicker/dist/react-datepicker.css";
import "./DareDayPicker.scss";

interface DareDayPickerProps {
    startDay: Date
    dayChangedCallback: (day: Date) => void
}

export const DareDayPicker = ({startDay, dayChangedCallback}: DareDayPickerProps) => {
    const [selectedDay, setSelectedDay] = useState(startDay);

    useEffect(() => {
        dayChangedCallback(selectedDay)
    }, [selectedDay])

    return <div className="titlemenu">
        <h3>RD requirements & Activations on {dayjs(selectedDay).format("MMMM D, YYYY")}</h3>
        <div className="datepicker">
            <DatePicker
                minDate={new Date("2021-06-01")}
                maxDate={new Date("2021-06-05 ")}
                selected={selectedDay}
                onChange={(day) => setSelectedDay(day)}/>
        </div>
    </div>
}
