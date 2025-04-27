'use client';

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import L from 'leaflet';

export default function TrafficMap() {
  const [trafficReports, setTrafficReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState('All');
  const [issues, setIssues] = useState([]);

  // Create marker icons
  const blackIcon = new L.Icon({
    iconUrl: '/icons/black.png',
    shadowUrl: '/icons/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const redIcon = new L.Icon({
    iconUrl: '/icons/red.png',
    shadowUrl: '/icons/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const yellowIcon = new L.Icon({
    iconUrl: '/icons/yellow.png',
    shadowUrl: '/icons/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const greenIcon = new L.Icon({
    iconUrl: '/icons/green.png',
    shadowUrl: '/icons/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  // Determine which icon to use based on issue
  const getIconByIssue = (issue) => {
    if (!issue) return blackIcon;

    const lower = issue.toLowerCase();

    if (lower.includes('crash') || lower.includes('collision')) {
      return redIcon;
    } else if (lower.includes('hazard') || lower.includes('debris')) {
      return yellowIcon;
    } else if (lower.includes('stalled')) {
      return blackIcon;
    } else if (lower.includes('livestock')) {
      return greenIcon;
    } else {
      return blackIcon; // default
    }
  };

  useEffect(() => {
    async function fetchTrafficReports() {
      try {
        const res = await fetch('https://data.austintexas.gov/resource/dx9v-zd7x.json');
        const data = await res.json();

        console.log(data);

        setTrafficReports(data);
        setFilteredReports(data);

        const uniqueIssues = Array.from(new Set(data.map(item => item.issue_reported)));
        setIssues(uniqueIssues);
      } catch (err) {
        console.error('Failed to fetch traffic reports:', err);
      }
    }
    fetchTrafficReports();
  }, []);

  useEffect(() => {
    if (selectedIssue === 'All') {
      setFilteredReports(trafficReports);
    } else {
      setFilteredReports(trafficReports.filter(r => r.issue_reported === selectedIssue));
    }
  }, [selectedIssue, trafficReports]);

  const handleIssueChange = (e) => {
    setSelectedIssue(e.target.value);
  };

  const centerPosition = [30.2672, -97.7431]; // Austin center

  return (
    <div>
      {/* Dropdown Filter */}
      <div className="flex justify-center mb-4 filter">
        <select
          className="border border-gray-300 p-2 rounded"
          value={selectedIssue}
          onChange={handleIssueChange}
        >
          <option value="All">All Issues</option>
          {issues.map((issue) => (
            <option key={issue} value={issue}>{issue}</option>
          ))}
        </select>
      </div>

      {/* Map */}
      <MapContainer center={centerPosition} zoom={12} scrollWheelZoom={true} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredReports.map((report) => {
          const lat = report.latitude ? parseFloat(report.latitude) : report.location?.coordinates?.[1];
          const lng = report.longitude ? parseFloat(report.longitude) : report.location?.coordinates?.[0];

          if (isNaN(lat) || isNaN(lng)) {
            return null;
          }

          return (
            <Marker
              key={report.traffic_report_id}
              position={[lat, lng]}
              icon={getIconByIssue(report.issue_reported)}
            >
              <Popup>
                <div className="text-sm">
                  <strong>Issue:</strong> {report.issue_reported}<br />
                  <strong>Address:</strong> {report.address}<br />
                  <strong>Agency:</strong> {report.agency?.trim() || 'N/A'}<br />
                  <strong>Status:</strong> {report.traffic_report_status || 'Unknown'}<br />
                  <strong>Reported:</strong> {new Date(report.published_date).toLocaleString() || 'Unknown'}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
