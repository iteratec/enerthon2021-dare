import * as React from 'react';
import {useEffect, useState} from "react";
import {MapContainer, TileLayer, useMapEvents, Marker, Popup} from 'react-leaflet';
import {scaledIcon} from "../marker/leaflet-color-markers";
import {PowerPlantTable} from "./PowerPlantTable";

import {powerPlantData} from "./powerPlantData";

import {timeseriesData} from "./timeseriesData"

import {AreaChart} from "react-charts-d3";

import "./mapView.scss";
import dayjs from "dayjs";

const colormap = {
    "B01": "orange",
    "B16": "yellow",
    "B19": "blue"
}

interface MapViewProps {
    day: Date
}

const ZoomListener = (zoomChanged: (zoom: number) => void) => {
    const [zoom, setZoom] = useState(-1);

    useEffect(() => {
        zoomChanged(zoom)
    }, [zoom])

    const mapEvents = useMapEvents({
        zoomend: () => {
            console.log(mapEvents.getZoom());
            setZoom(mapEvents.getZoom())
        }
    })

    return null;
}

const chartData = (name, date) => {
    const dateObj = dayjs(date)
    const plant = timeseriesData[name];
    const timeseries = plant[date].data;

    const dataMap = {};
    Object.entries(timeseries).forEach((series) => {
        const xValue = dateObj.add(15 * (+series[0] - 1), 'minute')
        const yValues = series[1];

        Object.entries(yValues).forEach((yValue) => {
            if (yValue[0]) {
                const d = {x: xValue.format('H:mm'), y: +yValue[1]}
                const group = dataMap[yValue[0]]
                if (group) {
                    group.push(d);
                } else {
                    dataMap[yValue[0]] = [d]
                }
            }
        });
    })
    return Object.keys(dataMap).map((group) => {
        return {key: group, values: dataMap[group]}
    });
}

export const MapView = ({day}: MapViewProps) => {

    return <MapContainer center={[51.1657, 10.4515]}
                         bounds={[[54.62129080028218, 3.790610177286792], [47.02321945431075, 14.842855458535878]]}
                         scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {Object.keys(powerPlantData).map((name, i) => <Marker
            key={i}
            icon={scaledIcon(.5, colormap[powerPlantData[name]["Energieträger"]])}
            position={[powerPlantData[name]["Lat"], powerPlantData[name]["Lon"]]}>
            <Popup>
                <h1>Data from {name} for {dayjs(day).format("MMMM D YYYY")}</h1>
                <PowerPlantTable powerPlantData={powerPlantData[name]}/>
                <div className="popupContent">
                    <AreaChart showGrid={false} data={chartData(name, dayjs(day).add(1, "day").format("YYYY-MM-DD[T][00]:mm:ssZ"))}/>
                </div>
            </Popup>
        </Marker>)}
    </MapContainer>
}

