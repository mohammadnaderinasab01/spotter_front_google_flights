import React from "react";
import styled from "styled-components";

const TopFlightsContainer = styled.div`
  border-radius: 5px;
  padding: 16px;
  background-color: #fff;
`;

const FlightItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #dadce0;

  &:last-child {
    border-bottom: none;
  }
`;

const FlightsList = styled.div`
  border: 1px solid #dadce0;
  padding: 10px;
`;

const FlightDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const Price = styled.div`
  font-weight: bold;
  color: #007bff;
`;

const Emissions = styled.div`
  font-size: 0.9em;
  color: #666;
`;

const TopFlights = ({ flights }) => {
  return (
    <TopFlightsContainer>
      <h3>Top Flights</h3>
      <FlightsList>
        {flights.map((flight, index) => (
          <FlightItem key={index}>
            <FlightDetails>
              <div>
                {flight.stops} stop{flight.stops > 1 ? "s" : ""}
              </div>
              <Emissions>{flight.emissions}</Emissions>
            </FlightDetails>
            <Price>IRR {flight.price}</Price>
          </FlightItem>
        ))}
      </FlightsList>
    </TopFlightsContainer>
  );
};

export default TopFlights;
