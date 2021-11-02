import * as React from 'react';
import * as d3 from "d3";
import {useEffect, useState} from "react";
import {MapContainer, TileLayer, useMapEvents, Marker, Popup} from 'react-leaflet';
import {drawWindmill, createWindmillDefs, windmillViewbox} from "../components/drawWindmill";
import {scaledIcon} from "../marker/leaflet-color-markers";

import {powerPlantData} from "./powerPlantData";

const greenIcon = scaledIcon(0.5, "green");

import "./mapView.scss";

const colormap = {
    "B01": "orange",
    "B16": "yellow",
    "B19": "blue"
}
const prepareWindmill = (name: string) => {
    const svg = d3.select(`svg.${name}`)
        .attr("overflow", "visible")
        .attr("viewbox", `0 0 ${windmillViewbox.width} ${windmillViewbox.height}`);
    createWindmillDefs(svg);
}

const removeWindmill = (name: string) => {
    d3.select(`svg.${name} svg.windmill`).remove();
}

const createWindmill = (name: string, zoom: number) => {
    const START_SCALE = 0.1;
    drawWindmill(`id-${name}`, `svg.${name}`, zoom > 0 ? START_SCALE * zoom/5 : START_SCALE)
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

export const MapView = () => {

    return <MapContainer center={[51.1657, 10.4515]} bounds={[[54.62129080028218, 3.790610177286792], [47.02321945431075, 14.842855458535878]]} scrollWheelZoom={false}>
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
                <div className="powerplant-table">
                    {Object.keys(powerPlantData[name]).map((attr, i) => <div key={i} className="powerplant-row">
                        <div className="powerplant-row-header">{attr}:</div>
                        <div className="powerplant-row-cell">{powerPlantData[name][attr]}</div>
                    </div>)}
                </div>
            </Popup>
        </Marker>)}
    </MapContainer>
}
