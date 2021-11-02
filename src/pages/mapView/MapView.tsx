import * as React from 'react';
import * as d3 from "d3";
import {useEffect, useState} from "react";
import {MapContainer, TileLayer, useMapEvents, Marker, Popup} from 'react-leaflet';
import {drawWindmill, createWindmillDefs, windmillViewbox} from "../components/drawWindmill";

import "./mapView.scss";

const windmills = {
    CSR1WIND001: {
        lat: 41.335162,
        long: 9.753427
    },
    CSR1WIND002: {
        lat: 49.602228,
        long: 9.61516
    },
    CSR1WIND008: {
        lat: 49.059187,
        long: 9.788426
    },
    CSR1WIND011: {
        lat: 47.70819,
        long: 7.926348
    },
    CSR1WIND014: {
        lat: 48.928871,
        long: 10.273493
    },
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

const ZoomListener = () => {
    const [zoom, setZoom] = useState(-1);

    useEffect(() => {
        setTimeout(() => {
            Object.keys(windmills).forEach(name => removeWindmill(name))
            Object.keys(windmills).forEach(name => createWindmill(name, zoom))
        })
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

    useEffect(() => {
        setTimeout(() => {
            Object.keys(windmills).forEach(name => prepareWindmill(name))
        })
    }, [])

    return <MapContainer center={[51.1657, 10.4515]} bounds={[[54.62129080028218, 3.790610177286792], [47.02321945431075, 14.842855458535878]]} scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {Object.keys(windmills).map((name, i) => <Marker
            key={i}
            position={[windmills[name].lat, windmills[name].long]}>
            <Popup>
                {name}
            </Popup>
        </Marker>)}
    </MapContainer>
}
