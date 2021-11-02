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
    const timeseries = plant[date][0].data;

    console.log(timeseries)

    const values = [{
        key: name,
        values:
            Object.entries(timeseries).map((d) => {
                const timestamp = dateObj.add(15 * (+d[0] - 1), 'minute');
                return {"x": timestamp.format('H:mm'), "y": +d[1]};
            })
    }];

    console.log(values)
    return values;
}

const popupContent = {
    textAlign: "center",
    height: "300px",
    width: "300px",
    marginTop: "30px"
};

export const MapView = () => {

    return <MapContainer center={[51.1657, 10.4515]}
                         bounds={[[54.62129080028218, 3.790610177286792], [47.02321945431075, 14.842855458535878]]}
                         scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {Object.keys(powerPlantData).map((name, i) => <Marker
            key={i}
            icon={scaledIcon(.5, colormap[powerPlantData[name]["Energieträger"]])}
            position={[powerPlantData[name]["Lat"], powerPlantData[name]["Lon"]]}>
            <Popup>
                <h1>{name}</h1>
                <PowerPlantTable powerPlantData={powerPlantData[name]}/>
                <div style={popupContent}>
                    <AreaChart data={chartData(name, "2021-06-02T00:00:00+02:00")}/>
                </div>
            </Popup>
        </Marker>)}
    </MapContainer>
}

