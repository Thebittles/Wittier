'use client';

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import L from 'leaflet';


export default function MyMap() {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([]);


  const healthIcon = new L.Icon({
    iconUrl: '/icons/green.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const firestationIcon = new L.Icon({
    iconUrl: '/icons/red.png', 
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const recreationIcon = new L.Icon({
    iconUrl: '/icons/yellow.png', 
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const policeIcon = new L.Icon({
    iconUrl: '/icons/black.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const getMarkerIconByType = (type) => {
    switch (type) {
      case 'Health Facility':
        return healthIcon;
      case 'Firestation':
        return firestationIcon;
      case 'Recreation Center':
        return recreationIcon;
      case 'Police Station':
        return policeIcon;
      default:
        return healthIcon; // fallback
    }
  };

  useEffect(() => {
    async function fetchResources() {
      try {
        const res = await fetch('/api/locations');
        const data = await res.json();

        console.log(data);

        setResources(data);
        setFilteredResources(data);

        // Dynamically build the categories list based on the API
        const uniqueCategories = Array.from(new Set(data.map(item => item.type)));
        setCategories(uniqueCategories);
      } catch (err) {
        console.error('Failed to fetch resources:', err);
      }
    }
    fetchResources();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredResources(resources);
    } else {
      setFilteredResources(resources.filter(r => r.type === selectedCategory));
    }
  }, [selectedCategory, resources]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const centerPosition = [30.2672, -97.7431]; // Default center: Austin

  return (
    <div>
      {/* Category Filter */}
      <div className="flex justify-center mb-4">
        <select
          className="border border-gray-300 p-2 rounded"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="All">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Map Container */}
      <MapContainer center={centerPosition} zoom={12} scrollWheelZoom={true} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredResources.map((resource) => (
          <Marker
            key={resource.id}
            position={[resource.lat, resource.lng]}
            icon={getMarkerIconByType(resource.type)}
          >
            <Popup>
              <strong>{resource.name}</strong><br />
              Type: {resource.type}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
