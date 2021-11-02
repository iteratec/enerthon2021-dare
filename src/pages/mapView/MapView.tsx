import * as React from 'react';
import {useEffect, useState} from "react";
import {MapContainer, TileLayer, useMapEvents, Marker, Popup} from 'react-leaflet';
import {scaledIcon} from "../marker/leaflet-color-markers";
import {PowerPlantTable} from "./PowerPlantTable";
import {PlanDataChart} from "./PlanDataChart";

import {powerPlantData} from "./powerPlantData";

import "./mapView.scss";
import dayjs from "dayjs";

const colormap = {
    "B01": "orange",
    "B16": "yellow",
    "B19": "blue"
}

interface MapViewProps {
    day: Date
    popupOpenedCallback: (name: string, day: Date) => void
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

export const MapView = ({day, popupOpenedCallback}: MapViewProps) => {

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
            <Popup onOpen={() => popupOpenedCallback(name, day)}>
                <h3>Data from {name} for {dayjs(day).format("MMMM D YYYY")}</h3>
                <PowerPlantTable powerPlantData={powerPlantData[name]}/>
                <PlanDataChart name={name} date={day}/>
            </Popup>
        </Marker>)}
    </MapContainer>
}

