import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css'; // Ensure CSS is imported
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

interface MapProps {
  searchQuery: string;
}

const MapComponent: React.FC<MapProps> = ({ searchQuery }) => {
  const initialPosition: L.LatLngExpression = [50.8503, 4.3517];
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return; // Ensure map instance is available

    const map = mapRef.current;
    const provider = new OpenStreetMapProvider();
    const searchControl = new (GeoSearchControl as any)({
      provider: provider,
      style: 'bar',
      autoComplete: true,
      autoCompleteDelay: 300,
      showMarker: true,
      showPopup: false,
    });

    map.addControl(searchControl);

    if (searchQuery) {
      provider.search({ query: searchQuery }).then((results) => {
        if (results.length > 0) {
          const { x, y } = results[0];
          map.setView([y, x], 13);
          // Add a marker at the searched location
          L.marker([y, x], { icon: new L.Icon.Default() }).addTo(map);
        }
      });
    }

    // Cleanup: remove the search control when the component unmounts
    return () => {
      map.removeControl(searchControl);
    };
  }, [searchQuery]); // This effect should depend on the searchQuery

  return (
    <MapContainer
      center={initialPosition}
      zoom={13}
      style={{ height: '500px', width: '100%' }}
      ref={mapRef} // Set the map instance reference here
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
};

export default MapComponent;
