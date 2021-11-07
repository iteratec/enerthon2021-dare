import * as React from "react";
import * as ReactDOM from "react-dom";

import {MapView} from "./MapView";
import {DareDayPicker} from "./DareDayPicker";
import {PlanDataChart} from "./PlanDataChart";
import {ActivationTableDataRow} from "./ActivationTable";
import {RedispatchesAndActivations} from "./RedispatchesAndActivations";
import {RedispatchChart, LineDatum, RedispatchChartData} from "./RedispatchChart";
import {useEffect, useState} from "react";
import {RedispatchData, redispatchData} from "./redispatchData";
import {toYYYYMMDD, quarterToHour} from "../../util/dateUtil";

document.getElementById("title").innerText = "Map View";

const defaultDay = new Date("2021-06-01");

const MainApp: React.FC = () => {
    const [selectedDay, setSelectedDay] = React.useState(defaultDay);
    const [selectedPowerPlant, setSelectedPowerPlant] = React.useState<string>();
    const [activatedPowerplants, setActivatedPowerplants] = React.useState<ActivationTableDataRow[]>();
    const [dashboardWidth, setDashboardWidth] = useState(0);
    const [rdRequirementsData, setRdRequirementsData] = useState<RedispatchChartData>();

    const createRdRequirementsData = () => {
        const redispatchDataOnDay = redispatchData.filter(rd => rd.date == toYYYYMMDD(selectedDay));

        const aggregated: LineDatum[] = [];

        const linenames = new Set<string>();

        const addToAggregated = (rd: RedispatchData) => {
            Object.keys(rd.data).forEach(k => {
                let aggEl = aggregated.find(agg => agg.q == k);
                if (!aggEl) {
                    aggEl = {q: k, hour: quarterToHour(Number(k))}
                    aggregated.push(aggEl);
                }

                const id = `${rd.nbName} (${rd.direction})`

                if (aggEl[id]) {
                    aggEl[id] += rd.data[k];
                } else {
                    linenames.add(id);
                    aggEl[id] = rd.data[k];
                }
            })
        }

        redispatchDataOnDay.forEach(addToAggregated);

        setRdRequirementsData({
            linenames: Array.from(linenames),
            linedata: aggregated
        })
    }

    useEffect(() => {
        createRdRequirementsData();
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
                    {dashboardWidth > 0 && <RedispatchChart width={dashboardWidth/5*4} height={200} chartData={rdRequirementsData}/>}
                </div>
            </div>
        </>
    );
};
ReactDOM.render(<MainApp />, document.getElementById("container"));
