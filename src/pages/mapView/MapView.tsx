import * as React from 'react';
import * as d3 from "d3";
import {useEffect, useState} from "react";
import {MapContainer, TileLayer, SVGOverlay, useMapEvents, Marker, Popup} from 'react-leaflet';
import {drawWindmill, createWindmillDefs} from "../components/drawWindmill";

import "./mapView.scss";

const windmills = {
    // CSR1WIND001: {
    //     lat: 41.335162,
    //     long: 9.753427
    // },
    CSR1WIND002: {
        lat: 49.602228,
        long: 9.61516
    },
    // CSR1WIND008: {
    //     lat: 49.059187,
    //     long: 9.788426
    // },
    // CSR1WIND011: {
    //     lat: 47.70819,
    //     long: 7.926348
    // },
    // CSR1WIND014: {
    //     lat: 48.928871,
    //     long: 10.273493
    // },
}

const prepareWindmill = (name: string) => {
    const svg = d3.select(`svg.${name}`)
        .attr("viewbox", "0 0 100 100");
    createWindmillDefs(svg);
}

const removeWindmill = (name: string) => {
    d3.select(`svg.${name} g.windmill`).remove();
}

const createWindmill = (name: string) => {
    drawWindmill(`id-${name}`, `svg.${name}`, 50, 50)
}

const ZoomListener = () => {
    const [zoom, setZoom] = useState(-1);

    useEffect(() => {
        setTimeout(() => {
            Object.keys(windmills).forEach(name => removeWindmill(name))
            Object.keys(windmills).forEach(name => createWindmill(name))
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

    return <MapContainer center={[54.5260, 15.2551]} bounds={[[54.98116852711412, 6.774064969673971], [40.85174639904891, 15.738908060627493]]} scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ZoomListener/>

        {Object.keys(windmills).map((name, i) => <SVGOverlay key={i} className={name} bounds={[[windmills[name].lat - 5, windmills[name].long - 5], [windmills[name].lat + 5, windmills[name].long + 5]]}/>)}

        {Object.keys(windmills).map((name, i) => <Marker key={i} position={[windmills[name].lat, windmills[name].long]}>
            <Popup>
                {name}
            </Popup>
        </Marker>)}
    </MapContainer>
}
