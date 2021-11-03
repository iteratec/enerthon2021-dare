import * as React from 'react';
import {useEffect, useState} from "react";
import {MapContainer, TileLayer, useMapEvents, Marker, Popup} from 'react-leaflet';

import {scaledIcon} from "../marker/leaflet-color-markers";
import {PowerPlantTable} from "./PowerPlantTable";

import {powerPlantData} from "./powerPlantData";

import "./mapView.scss";

const colormap = {
    "B01": "orange",
    "B16": "yellow",
    "B19": "blue"
}

interface MapViewProps {
    day: Date
    highlightedNames?: string[]
    popupOpenedCallback?: (name: string, day: Date) => void
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

export const MapView = ({day, popupOpenedCallback, highlightedNames}: MapViewProps) => {
    const markerRefs: {[key: string] : any}[] = [];

    return <MapContainer center={[48.72136522068032, 9.700661146305457]}
                         bounds={[[49.931892920919836, 6.48161423248249], [47.28561741177902, 11.458964082427245]]}
                         scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {Object.keys(powerPlantData).map((name, i) => <Marker
            ref = {ref => markerRefs[name] = ref}
            key={i}
            icon={scaledIcon((highlightedNames && highlightedNames.indexOf(name)) > -1 ? 1 : 0.5, colormap[powerPlantData[name]["Energieträger"]])}
            position={[powerPlantData[name]["Lat"], powerPlantData[name]["Lon"]]}>
            <Popup onOpen={() => {
                if(popupOpenedCallback) {
                    popupOpenedCallback(name, day)
                }
            }}>
                <h3>{name}</h3>
                <PowerPlantTable powerPlantData={powerPlantData[name]}/>
            </Popup>
        </Marker>)}
    </MapContainer>
}
