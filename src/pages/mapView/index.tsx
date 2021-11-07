import * as React from "react";
import * as ReactDOM from "react-dom";

import {MapView} from "./MapView";
import {DareDayPicker} from "./DareDayPicker";
import {PlanDataChart} from "./PlanDataChart";
import {ActivationTableDataRow} from "./ActivationTable";
import {RedispatchesAndActivations} from "./RedispatchesAndActivations";
import {RedispatchChart, LineDatum, RedispatchChartData} from "./RedispatchChart";
import {useEffect, useState} from "react";
import {redispatchData} from "./redispatchData";
import {activationData} from "./activationData";
import {toYYYYMMDD, quarterToHour} from "../../util/dateUtil";

document.getElementById("title").innerText = "Map View";

const defaultDay = new Date("2021-06-05");

const MainApp: React.FC = () => {
    const [selectedDay, setSelectedDay] = React.useState(defaultDay);
    const [selectedPowerPlant, setSelectedPowerPlant] = React.useState<string>();
    const [activatedPowerplants, setActivatedPowerplants] = React.useState<ActivationTableDataRow[]>();
    const [dashboardWidth, setDashboardWidth] = useState(0);
    const [rdRequirementsData, setRdRequirementsData] = useState<RedispatchChartData>();
    const [rdActivationData, setRdActivationData] = useState<RedispatchChartData>();

    const _addToAggregated = (rd: {name: string, direction: string, data: {[key: string]: number}}, aggregated: LineDatum[], linenames: Set<string>) => {
        Array.from(Array(96).keys()).forEach(q => {
            const k = q+1;
            let aggEl = aggregated.find(agg => agg.q == k);
            if (!aggEl) {
                aggEl = {q: k, hour: quarterToHour(Number(k))}
                aggregated.push(aggEl);
            }

            const id = `${rd.name} (${rd.direction})`

            if (aggEl[id]) {
                aggEl[id] += rd.data[k];
            } else {
                linenames.add(id);
                aggEl[id] = rd.data[k];
            }
        })
    }

    const createRdRequirementsData = () => {
        const redispatchDataOnDay = redispatchData.filter(rd => rd.date == toYYYYMMDD(selectedDay));
        const aggregated: LineDatum[] = [];
        const linenames = new Set<string>();

        redispatchDataOnDay.forEach((rd) => _addToAggregated({name: rd.nbName, direction: rd.direction, data: rd.data}, aggregated, linenames));

        setRdRequirementsData({
            linenames: Array.from(linenames),
            linedata: aggregated
        })
    }

    const createRdActivationData = () => {
        const aggregated: LineDatum[] = [];
        const linenames = new Set<string>();

        Object.keys(activationData).forEach(powerplant => {
            const el = activationData[powerplant][toYYYYMMDD(selectedDay)];
            if(el) {
                _addToAggregated({name: powerplant, direction: el.type, data: el.data}, aggregated, linenames);
            }
        })

        setRdActivationData({
            linenames: Array.from(linenames),
            linedata: aggregated
        })
    }

    useEffect(() => {
        createRdRequirementsData();
        createRdActivationData();
    }, [selectedDay])

    useEffect(() => {
        setTimeout(() => {
            const rect = document.getElementById("dashboard").getBoundingClientRect();
            setDashboardWidth(rect.width);
        }, 100)
    }, [])

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
                    {dashboardWidth > 0 && <RedispatchChart yTitle="RD Requirements (MW)" width={600} height={200} chartData={rdRequirementsData}/>}<br/>
                    {dashboardWidth > 0 && <RedispatchChart yTitle="RD Activations (MW)" width={600} height={200} chartData={rdActivationData}/>}
                </div>
            </div>
        </>
    );
};
ReactDOM.render(<MainApp />, document.getElementById("container"));
