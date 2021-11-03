import * as React from 'react';
import {useEffect, useState} from "react";
import {MapContainer, TileLayer, useMapEvents, Marker, Popup} from 'react-leaflet';
import dayjs from "dayjs";

import {scaledIcon} from "../marker/leaflet-color-markers";
import {PowerPlantTable} from "./PowerPlantTable";

import {powerPlantData} from "./powerPlantData";
import {activationData} from "./activationData";

import "./mapView.scss";

const colormap = {
    "B01": "orange",
    "B16": "yellow",
    "B19": "blue"
}

interface MapViewProps {
    day: Date
    selectedName: string
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

const isActiveted = (name: string, day: Date): boolean => {
    const data = activationData[name];
    if(data) {
        const dayStr = dayjs(day).format("YYYY-MM-DD");
        return (data[dayStr] != undefined);
    }

    return false;
}

export const MapView = ({day, popupOpenedCallback, selectedName}: MapViewProps) => {
    const markerRefs: {[key: string] : any}[] = [];

    return <MapContainer center={[51.1657, 10.4515]}
                         bounds={[[54.62129080028218, 3.790610177286792], [47.02321945431075, 14.842855458535878]]}
                         scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {Object.keys(powerPlantData).map((name, i) => <Marker
            ref = {ref => markerRefs[name] = ref}
            key={i}
            icon={scaledIcon(isActiveted(name, day) ? 1 : 0.5, colormap[powerPlantData[name]["Energieträger"]])}
            position={[powerPlantData[name]["Lat"], powerPlantData[name]["Lon"]]}>
            <Popup onOpen={() => popupOpenedCallback(name, day)}>
                <h3>{name}</h3>
                <PowerPlantTable powerPlantData={powerPlantData[name]}/>
            </Popup>
        </Marker>)}
    </MapContainer>
}
