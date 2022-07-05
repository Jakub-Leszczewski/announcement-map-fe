import L from 'leaflet';

L.Marker.prototype.options.icon = L.icon({
  iconUrl: '/geo-alt-fill-blue.svg',
  iconSize: [35, 51],
  iconAnchor: [12, 41],
});

export const userIcon = L.icon({
  iconUrl: '/geo-alt-fill-red.svg',
  iconSize: [35, 51],
  iconAnchor: [12, 41],
});
