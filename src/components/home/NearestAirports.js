import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchNearestAirports } from "../../services/APIs"; // Import the API function
import FlightIcon from "@mui/icons-material/Flight";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Container = styled.div`
  padding: 16px;

  ul {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 20px;
  }
`;

const AirportItem = styled.div`
  margin-left: 4px;
  display: flex;
  align-items: center;
`;

const AirportInfo = styled.div`
  margin-left: 16px;

  & > p {
    font-weight: 600;
  }
  & > div {
    display: flex;
  }
  & > div > div {
    display: flex;
  }
  & > div > div > p,
  & > div > div svg {
    white-space: nowrap;
    color: var(--color-rolling-stone);
  }
`;

const NearestAirports = ({ origin, userLocation }) => {
  const [airports, setAirports] = useState([]);

  useEffect(() => {
    if (userLocation) {
      const getNearestAirports = async () => {
        const data = await fetchNearestAirports(
          userLocation.lat,
          userLocation.lng
        );
        setAirports(data?.data?.nearby); // Adjust based on the API response structure
      };
      getNearestAirports();
    }
  }, [userLocation]);

  return (
    <Container>
      <h3>Popular airports near {origin}</h3>
      <ul>
        {airports.map((airport, index) => (
          <AirportItem key={index}>
            <FlightIcon
              sx={{
                fontSize: "1.2rem",
                padding: "2px 2px 3px",
                color: "#fff",
                backgroundColor: "#1a73e8",
                borderRadius: "50%",
              }}
            />
            <AirportInfo>
              <p>
                {airport?.presentation?.title} Airport (
                {airport?.navigation?.relevantFlightParams?.skyId})
              </p>
              <div>
                <div>
                  <p>
                    {airport?.navigation?.relevantHotelParams?.localizedName}
                  </p>
                </div>
                <div>
                  &nbsp;·&nbsp;
                  <DirectionsCarIcon fontSize="small" />
                  <p>20 min</p>
                </div>
                &nbsp;·&nbsp;
                <div>
                  <LocationOnIcon fontSize="small" />
                  <p>30 km</p>
                </div>
              </div>
            </AirportInfo>
          </AirportItem>
        ))}
      </ul>
    </Container>
  );
};

export default NearestAirports;
