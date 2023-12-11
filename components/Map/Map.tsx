import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';

// Import the Leaflet marker icon images
const iconUrl = 'leaflet/dist/images/marker-icon.png';
const iconRetinaUrl = 'leaflet/dist/images/marker-icon-2x.png';
const shadowUrl = 'leaflet/dist/images/marker-shadow.png';

const customDefaultIcon = L.icon({
  iconUrl: '/marker-icon.png', // Assume you have marker-icon.png in the public folder
  iconRetinaUrl: '/marker-icon-2x.png', // Assume you have marker-icon-2x.png in the public folder
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

interface MapProps {
  searchQuery: string;
}

const MapComponent: React.FC<MapProps> = ({ searchQuery }) => {
  const initialPosition: L.LatLngExpression = [50.8503, 4.3517]; // Default to Brussels, Belgium
  const mapRef = useRef<L.Map>();

  const MapEffect = () => {
    const map = useMap();
    mapRef.current = map;

    useEffect(() => {
      if (!map) return;
      L.Marker.prototype.options.icon = customDefaultIcon;

      const provider = new OpenStreetMapProvider();
      const searchControl = new (GeoSearchControl as any)({
        provider: provider,
        style: 'bar',
        autoComplete: true,
        autoCompleteDelay: 300,
        showMarker: true,
        showPopup: false,
        marker: {
          icon: Icon,
          draggable: false,
        },
      });

      map.addControl(searchControl);

      return () => {
        map.removeControl(searchControl);
      };
    }, [map]);

    useEffect(() => {
      if (searchQuery && mapRef.current) {
        const provider = new OpenStreetMapProvider();
        provider.search({ query: searchQuery }).then((results) => {
          if (results.length > 0) {
            const { x, y } = results[0];
            map.setView([y, x], 13);
          }
        });
      }
    }, [searchQuery]);

    return null;
  };

  return (
    <MapContainer center={initialPosition} zoom={13} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapEffect />
    </MapContainer>
  );
};

export default MapComponent;
