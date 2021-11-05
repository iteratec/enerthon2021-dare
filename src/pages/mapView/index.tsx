import * as React from "react";
import * as ReactDOM from "react-dom";

import {MapView} from "./MapView";
import {DareDayPicker} from "./DareDayPicker";
import {PlanDataChart} from "./PlanDataChart";
import {ActivationTable} from "./ActivationTable";

document.getElementById("title").innerText = "Map View";

const defaultDay = new Date("2021-06-01");

const MainApp: React.FC = () => {
    const [selectedDay, setSelectedDay] = React.useState(defaultDay);
    const [selectedPowerPlant, setSelectedPowerPlant] = React.useState<string>();
    const [highlightedNames, setHighlightedNames] = React.useState<string[]>();

    return (
        <>
            <div id="menu">
                <DareDayPicker
                    startDay={defaultDay}
                    dayChangedCallback={setSelectedDay}/>
            </div>
            <div id="content">
                <div id="map">
                    <MapView popupOpenedCallback={setSelectedPowerPlant} highlightedNames={highlightedNames}/>
                </div>
                <div id="dashboard">
                    <ActivationTable day={selectedDay} activatedPowerplantsCallback={setHighlightedNames}/>
                    {selectedPowerPlant && <PlanDataChart name={selectedPowerPlant} date={selectedDay}/>}
                </div>
            </div>
        </>
    );
};
ReactDOM.render(<MainApp />, document.getElementById("container"));
