import React from "react";
import styled from "styled-components";

const FlightList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  @media (min-width: 800px) {
    max-width: 720px;
    margin: 0 auto;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const FlightItemWrapper = styled.div`
  width: 100%;
  display: flex;
  margin: 8px 0;
  background-color: #fff;
  overflow: hidden;
  padding: 4px 16px;
  @media (min-width: 800px) {
    flex-direction: column;
    padding: 0;
  }
`;

const FlightImage = styled.img`
  width: 40%;
  max-width: 150px;
  height: auto;
  margin: 0 auto;
  object-fit: cover;
  border-radius: 8px;
  @media (min-width: 800px) {
    width: 100%;
    height: 110px;
  }
`;

const FlightDetailsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 12px 8px 8px;
  justify-content: flex-start;
`;

const FlightTitle = styled.h3`
  width: 100%;
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (min-width: 800px) {
    flex-direction: column;
    align-items: flex-start;
  }
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
    <FlightList>
      {flights.map((flight, index) => (
        <FlightItemWrapper key={index}>
          <FlightImage src={flight.image} alt={flight.title} />
          <FlightDetailsWrapper>
            <FlightTitle>
              <span>{flight.title}</span>
              <span>{flight.price}</span>
            </FlightTitle>
            <FlightPrice>{flight.price}</FlightPrice>
            <FlightDetails>{flight.details}</FlightDetails>
          </FlightDetailsWrapper>
        </FlightItemWrapper>
      ))}
    </FlightList>
  );
};

export default CheapFlightsList;
