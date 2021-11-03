import * as React from "react"
import * as ReactDOM from "react-dom"

import {MapView} from "./MapView";
import {DareDayPicker} from "./DareDayPicker";
import {PlanDataChart} from "./PlanDataChart";

document.getElementById("title").innerText = "Map View";

const defaultDay = new Date("2021-06-01");

let currentName;

const showDataForPlan = (name: string, day: Date) => {
    console.log(`Popup: name=${name} / day=${day}`)
    ReactDOM.render(<PlanDataChart name={name} date={day}/>, document.getElementById("dashboard"));
    currentName = name;
}

const showMapOnDay = (day: Date) => {
    ReactDOM.render(<MapView day={day} popupOpenedCallback={showDataForPlan} selectedName={currentName}/>, document.getElementById("map"));
    if(currentName) {
        showDataForPlan(currentName, day);
    }
}

ReactDOM.render(<DareDayPicker
    startDay={defaultDay}
    dayChangedCallback={showMapOnDay}/>, document.getElementById("menu"));
showMapOnDay(defaultDay);
