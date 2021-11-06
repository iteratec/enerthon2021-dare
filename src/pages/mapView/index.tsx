import * as React from "react";
import * as ReactDOM from "react-dom";

import {MapView} from "./MapView";
import {DareDayPicker} from "./DareDayPicker";
import {PlanDataChart} from "./PlanDataChart";
import {ActivationTableDataRow} from "./ActivationTable";
import {RedispatchesAndActivations} from "./RedispatchesAndActivations";
import {RdChart} from "./RdChart";

document.getElementById("title").innerText = "Map View";

const defaultDay = new Date("2021-06-01");

const MainApp: React.FC = () => {
    const [selectedDay, setSelectedDay] = React.useState(defaultDay);
    const [selectedPowerPlant, setSelectedPowerPlant] = React.useState<string>();
    const [activatedPowerplants, setActivatedPowerplants] = React.useState<ActivationTableDataRow[]>();

    return (
        <>
            <div id="menu">
                <DareDayPicker
                    startDay={defaultDay}
                    dayChangedCallback={setSelectedDay}/>
            </div>
            <div id="content">
                <div id="map">
                    <MapView popupOpenedCallback={setSelectedPowerPlant}
                             highlightedPowerplants={activatedPowerplants ? activatedPowerplants.reduce((_highlightedPowerplants, activatedPowerplant) => {
                                 return {..._highlightedPowerplants, [activatedPowerplant.powerplant]: activatedPowerplant.isUp ? "up" : (activatedPowerplant.isDown ? "down" : undefined)}
                             }, {}) : undefined}/>
                </div>
                <div id="dashboard">
                    <RedispatchesAndActivations day={selectedDay} activatedPowerplantsCallback={setActivatedPowerplants}/>
                    {selectedPowerPlant && <PlanDataChart name={selectedPowerPlant} date={selectedDay}/>}
                    <RdChart day={selectedDay}/>
                </div>
            </div>
        </>
    );
};
ReactDOM.render(<MainApp />, document.getElementById("container"));
