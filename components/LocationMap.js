'use client';

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet's missing icon issue (optional)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

export default function LocationMap() {
  const [locations, setLocations] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true); // <-- New loading state

  useEffect(() => {
    setMounted(true);

    async function fetchLocations() {
      try {
        const res = await fetch('/api/locations');
        const data = await res.json();
        setLocations(data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      } finally {
        setLoading(false); // <-- Turn off loading spinner after fetching
      }
    }

    fetchLocations();
  }, []);

  if (!mounted) return null;

  const tags = ['All', 'Firestation', 'Policestation', 'Shelter'];

  const filteredLocations = selectedType === 'All'
    ? locations
    : locations.filter(loc => loc.type === selectedType);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Tag Filters */}
      <div className="flex flex-wrap justify-center gap-2">
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedType(tag)}
            className={`px-4 py-2 rounded-full border ${
              selectedType === tag ? 'bg-blue-600 text-white' : 'bg-white text-black'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Map or Loading */}
      <div className="w-full" style={{ height: '500px' }}>
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-solid"></div>
          </div>
        ) : (
          <MapContainer center={[30.2672, -97.7431]} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />
            {filteredLocations.map(location => (
              <Marker
                key={location.id}
                position={[location.lat, location.lng]}
              >
                <Popup>
                  {location.name}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>
    </div>
  );
}
