import * as React from "react"
import * as ReactDOM from "react-dom"

import {MapView} from "./MapView";
import {DareDayPicker} from "./DareDayPicker";
import {PlanDataChart} from "./PlanDataChart";

document.getElementById("title").innerText = "Map View";

const defaultDay = new Date("2021-06-01");

const showDataForPlan = (name: string, day: Date) => {
    console.log(`Popup: name=${name} / day=${day}`)
}

const showMapOnDay = (day: Date) => {
    ReactDOM.render(<MapView day={day} popupOpenedCallback={showDataForPlan}/>, document.getElementById("map"));
}

ReactDOM.render(<DareDayPicker
    startDay={defaultDay}
    dayChangedCallback={showMapOnDay}/>, document.getElementById("menu"));
showMapOnDay(defaultDay);
