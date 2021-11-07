import * as React from 'react';
import {useState} from 'react';
import {MapContainer, Marker, Popup, SVGOverlay, TileLayer, useMapEvents} from 'react-leaflet';

import {scaledIcon} from "../../marker/leaflet-color-markers";
import {PowerPlantTable} from "./PowerPlantTable";

import {powerPlantData} from "./powerPlantData";

import "./mapView.scss";

const colormap = {
    "B01": "orange",
    "B16": "yellow",
    "B19": "blue"
};

export type HighlightedPowerplants = {[kay: string]: "up" | "down"};

interface MapViewProps {
    highlightedPowerplants?: HighlightedPowerplants;
    popupOpenedCallback: (name: string) => void;
}

interface ZoomListenerProps {
    zoomChangedCallback: (zoom: number) => void;
}

const ZoomListener = ({zoomChangedCallback}: ZoomListenerProps) => {
    const mapEvents = useMapEvents({
        zoomend: () => {
            zoomChangedCallback(mapEvents.getZoom());
        }
    });

    return null;
};

interface PowerPlantMarkerProps {
    name: string;
    markerSize: number;
    onOpenPopup: (name: string) => void;
}

const PowerPlantMarker: React.FC<PowerPlantMarkerProps> = ({
                                                               name,
                                                               markerSize,
                                                               onOpenPopup
                                                           }) => {
    const popupOpenCallback = React.useCallback(() => {
        onOpenPopup(name);
    }, [name, onOpenPopup]);
    return (<Marker
        icon={scaledIcon(markerSize, colormap[powerPlantData[name]["Energieträger"]], name)}
        position={[powerPlantData[name]["Lat"], powerPlantData[name]["Lon"]]}>
        <Popup onOpen={popupOpenCallback}>
            <h3>{name}</h3>
            <PowerPlantTable powerPlantData={powerPlantData[name]}/>
        </Popup>
    </Marker>);
};

export const MapView = ({popupOpenedCallback, highlightedPowerplants}: MapViewProps) => {
    const DEFAULT_MARKER_SIZE = 0.8;
    const DEFAULT_HIGHLIGHT_CIRCLE_RADIUS = 15;
    const [zoomLevel, setZoomLevel] = useState(-1);

    const newZoomLevel = React.useCallback((zoomLevel: number) => {
        setZoomLevel(zoomLevel);
    }, []);

    return <MapContainer center={[48.72136522068032, 9.700661146305457]}
                         bounds={[[49.931892920919836, 6.48161423248249], [47.28561741177902, 11.458964082427245]]}
                         scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        <ZoomListener zoomChangedCallback={newZoomLevel}/>

        {Object.keys(powerPlantData).map(name => {
            if(highlightedPowerplants && highlightedPowerplants[name]) {
                return <SVGOverlay key={name} bounds={[[powerPlantData[name].Lat - .4, powerPlantData[name].Lon - .4], [powerPlantData[name].Lat + .4, powerPlantData[name].Lon + .4]]}>
                    <circle className="highlight" r={zoomLevel > 0 ? DEFAULT_HIGHLIGHT_CIRCLE_RADIUS + zoomLevel : DEFAULT_HIGHLIGHT_CIRCLE_RADIUS} cx="50%" cy="50%" fill={highlightedPowerplants[name] == "up" ? "green" : "red"}/>
                </SVGOverlay>
            }

            return <span key={name} />
        })}

        {Object.keys(powerPlantData).map((name) => <PowerPlantMarker
            key={name}
            name={name}
            markerSize={zoomLevel > 0 ? DEFAULT_MARKER_SIZE * zoomLevel / 8 : DEFAULT_MARKER_SIZE}
            onOpenPopup={popupOpenedCallback}/>)}
    </MapContainer>;
};
