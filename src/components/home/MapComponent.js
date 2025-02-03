import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import { fetchAirportsData } from "../../services/APIs"; // Import the new function
import { useSelector } from "react-redux";

const MapContainer = styled.div`
  width: 100%;
  max-width: 320px;
  min-height: 200px; // Adjust height as needed
  border-radius: 8px; // Optional: Add border radius for aesthetics
  margin: 16px 0; // Add margin for spacing
  margin: 0 auto;
  @media (min-width: 800px) {
    min-height: 240px;
  }
`;

const ExploreLink = styled.a`
  background-color: #fff; // Button color
  color: #007bff;
  border: none;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  padding: 4px 8px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  z-index: 1000;
  transition: all 0.2s;
  position: absolute; // Position the button absolutely
  top: 50%; // Center vertically
  left: 50%; // Center horizontally
  transform: translate(-50%, 0); // Adjust position to truly center the button

  &:hover {
    background-color: #0056b3; // Darker shade on hover
  }
`;

const MapComponentWrapper = styled.div`
  position: relative; // Set position to relative for absolute positioning of child elements
  padding: 24px 16px;
  h3 {
    font-family: "Google Sans", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 0px;
    line-height: 24px;
    color: var(--color-shark);
    margin-bottom: 16px;
  }
  @media (min-width: 800px) {
    max-width: 720px;
    margin: 0 auto;
  }
`;

const airportsData = [
  // Define an array of airport coordinates
  { latitude: 40.7128, longitude: -74.006 }, // New York City, USA
  { latitude: 51.5074, longitude: -0.1278 }, // London, UK
  { latitude: 35.6762, longitude: 139.6503 }, // Tokyo, Japan
  { latitude: -33.8688, longitude: 151.2093 }, // Sydney, Australia
  { latitude: 55.7558, longitude: 37.6173 }, // Moscow, Russia
];

const MapComponent = ({ userLocation }) => {
  const { origin } = useSelector((state) => state.flightSearch);

  const [airports, setAirports] = useState([]);
  // useEffect(() => {
  //   // Fetch airport data from Sky Scrapper API
  //   const fetchAirports = async () => {
  //     try {
  //       const response = await fetchAirportsData(); // Call the new function
  //       console.log("response.data: ", response.data);
  //       setAirports(response.data.data); // Assuming the response contains an array of airports
  //     } catch (error) {
  //       console.error("Error fetching airport data:", error);
  //     }
  //   };

  //   fetchAirports();
  // }, []);

  useEffect(() => {
    const map = L.map("map").setView([userLocation.lat, userLocation.lng], 0); // Adjust zoom level as needed
    map.scrollWheelZoom.disable();
    map.zoomControl.remove();
    map.doubleClickZoom.disable();
    map.dragging.disable();
    map.touchZoom.disable();
    map.scrollWheelZoom.disable();
    // Add OpenStreetMap tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add a marker for the user's location
    L.marker([userLocation.lat, userLocation.lng], {
      icon: L.icon({
        iconUrl: "https://www.gstatic.com/flights/app/dot_pink_21.png", // Custom icon for user location
        iconSize: [20, 20],
        iconAnchor: [12, 4],
      }),
    }).addTo(map);

    // Add markers for airports
    airportsData.forEach((airport) => {
      // Use the new array here
      L.marker([airport.latitude, airport.longitude], {
        icon: L.icon({
          iconUrl: "https://www.gstatic.com/flights/app/dot_blue_21.png", // Custom blue icon for airports
          iconSize: [20, 20],
          iconAnchor: [12, 4],
        }),
      }).addTo(map);
    });

    // Cleanup on unmount
    return () => {
      map.remove();
    };
  }, [userLocation, airports]);

  return (
    <MapComponentWrapper>
      {origin && origin !== "" && (
        <h3>Find flights from {origin} to anywhere</h3>
      )}
      <MapContainer id="map" />
      <ExploreLink>Explore destinations</ExploreLink>
    </MapComponentWrapper>
  );
};

export default MapComponent;
