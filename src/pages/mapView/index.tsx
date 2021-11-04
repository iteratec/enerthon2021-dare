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

    const activatedPowerplantsCallback = (powerplants: {powerplant: string}[]) => {
        const names = powerplants.map(p => p.powerplant);
        setHighlightedNames(names);
    }

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
                    {selectedPowerPlant && <PlanDataChart name={selectedPowerPlant} date={selectedDay}/>}
                    <ActivationTable day={selectedDay} activatedPowerplantsCallback={activatedPowerplantsCallback}/>
                </div>
            </div>
        </>
    );
};
ReactDOM.render(<MainApp />, document.getElementById("container"));
