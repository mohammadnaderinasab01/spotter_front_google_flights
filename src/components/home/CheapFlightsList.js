import React from "react";
import styled from "styled-components";

const FlightItemWrapper = styled.div`
  display: flex;
  margin: 8px 0;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  padding: 4px 16px;
`;

const FlightImage = styled.img`
  width: 120px;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
`;

const FlightDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  justify-content: center;
`;

const FlightTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
`;

const FlightPrice = styled.p`
  margin: 0;
  font-size: 16px;
  color: #5f6368;
`;

const FlightDetails = styled.p`
  margin: 4px 0 0;
  font-size: 14px;
  color: #9e9e9e;
`;

const CheapFlightsList = ({ flights }) => {
  return (
    <div>
      {flights.map((flight, index) => (
        <FlightItemWrapper key={index}>
          <FlightImage src={flight.image} alt={flight.title} />
          <FlightDetailsWrapper>
            <FlightTitle>
              {flight.title} {flight.price}
            </FlightTitle>
            <FlightPrice>{flight.price}</FlightPrice>
            <FlightDetails>{flight.details}</FlightDetails>
          </FlightDetailsWrapper>
        </FlightItemWrapper>
      ))}
    </div>
  );
};

export default CheapFlightsList;
