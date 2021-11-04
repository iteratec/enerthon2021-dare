import * as React from 'react';
import {useState} from 'react';
import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from 'react-leaflet';

import {scaledIcon} from "../marker/leaflet-color-markers";
import {PowerPlantTable} from "./PowerPlantTable";

import {powerPlantData} from "./powerPlantData";

import "./mapView.scss";

const colormap = {
    "B01": "orange",
    "B16": "yellow",
    "B19": "blue"
};

interface MapViewProps {
    highlightedNames?: string[];
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
    highlightedNames?: string[];
    markerSize: number;
    onOpenPopup: (name: string) => void;
}

const PowerPlantMarker: React.FC<PowerPlantMarkerProps> = ({
                                                               name,
                                                               highlightedNames,
                                                               markerSize,
                                                               onOpenPopup
                                                           }) => {
    const popupOpenCallback = React.useCallback(() => {
        onOpenPopup(name);
    }, [name, onOpenPopup]);
    return (<Marker
        icon={scaledIcon((highlightedNames && highlightedNames.indexOf(name)) > -1 ? markerSize * 2 : markerSize, colormap[powerPlantData[name]["Energieträger"]], name)}
        position={[powerPlantData[name]["Lat"], powerPlantData[name]["Lon"]]}>
        <Popup onOpen={popupOpenCallback}>
            <h3>{name}</h3>
            <PowerPlantTable powerPlantData={powerPlantData[name]}/>
        </Popup>
    </Marker>);
};

export const MapView = ({popupOpenedCallback, highlightedNames}: MapViewProps) => {
    const DEFAULT_MARKER_SIZE = 0.8;
    const [markerSize, setMarkerSize] = useState(DEFAULT_MARKER_SIZE);

    const newZoom = React.useCallback((zoom: number) => {
        setMarkerSize(DEFAULT_MARKER_SIZE * zoom / 8);
    }, []);

    return <MapContainer center={[48.72136522068032, 9.700661146305457]}
                         bounds={[[49.931892920919836, 6.48161423248249], [47.28561741177902, 11.458964082427245]]}
                         scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        <ZoomListener zoomChangedCallback={newZoom}/>

        {Object.keys(powerPlantData).map((name) => <PowerPlantMarker
            key={name}
            name={name}
            markerSize={markerSize}
            highlightedNames={highlightedNames}
            onOpenPopup={popupOpenedCallback}/>)}
    </MapContainer>;
};
