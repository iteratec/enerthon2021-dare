import * as React from 'react';
import * as d3 from "d3";
import {useEffect} from "react";
import { MapContainer, TileLayer, Marker, Popup, SVGOverlay } from 'react-leaflet';
import {drawWindmill, createWindmillDefs} from "../components/drawWindmill";

import "./mapView.scss";

export const MapView = () => {

    useEffect(() => {
        setTimeout(() => {
            const svg = d3.select("svg.leaflet-image-layer");
            createWindmillDefs(svg);
            svg.append("g").attr("id", "maproot");

            d3.select("#maproot")
                .append("g")
                .attr("id", "windmillroot");
            drawWindmill("windmill-1", "#windmillroot", 1200, 2000)

        })
    })

    return <MapContainer center={[49.602228, 9.61516]} zoom={10} scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SVGOverlay attributes={{ stroke: 'red' }} bounds={[[49, 9], [50, 10]]}>
        </SVGOverlay>
    </MapContainer>
}