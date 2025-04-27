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

  // 🛠️ Map issue types to Tailwind background color classes
  const getMarkerColor = (issue) => {
    if (!issue) return 'bg-blue-500'; // Default blue
    
    issue = issue.toLowerCase();

    if (issue.includes('crash') || issue.includes('collision')) {
      return 'bg-red-500';
    } else if (issue.includes('hazard') || issue.includes('debris')) {
      return 'bg-orange-500';
    } else if (issue.includes('stalled')) {
      return 'bg-yellow-400';
    } else if (issue.includes('livestock')) {
      return 'bg-green-500';
    } else {
      return 'bg-blue-500';
    }
  };

  // 🛠️ Create a DivIcon (circle marker with dynamic color)
  const createColoredDivIcon = (colorClass) => {
    return L.divIcon({
      className: '',
      html: `<div class="w-4 h-4 rounded-full ${colorClass} border-2 border-white"></div>`,
      iconSize: [16, 16],
      popupAnchor: [0, -8],
    });
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
      <div className="flex justify-center mb-4">
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
        {filteredReports.map((report) => (
          <Marker
            key={report.traffic_report_id}
            position={[parseFloat(report.latitude), parseFloat(report.longitude)]}
            icon={createColoredDivIcon(getMarkerColor(report.issue_reported))}
          >
            <Popup>
              <strong>{report.issue_reported}</strong><br />
              Address: {report.address}<br />
              Agency: {report.agency?.trim()}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
