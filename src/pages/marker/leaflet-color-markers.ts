import * as L from "leaflet";

export const blueIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-blue.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

export const goldIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-gold.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

export const redIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-red.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

export const greenIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-green.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

export const orangeIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-orange.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

export const yellowIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-yellow.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

export const violetIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-violet.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

export const greyIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-grey.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

export const blackIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-black.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

export const scaledIcon = (scale: number, color: string) => new L.Icon({
	iconUrl: `img/marker-icon-2x-${color}.png`,
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25*scale, 41*scale],
	iconAnchor: [12*scale, 41*scale],
	popupAnchor: [1*scale, -34*scale],
	shadowSize: [41*scale, 41*scale]
});


