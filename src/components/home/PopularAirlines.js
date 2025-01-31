import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 16px;
  h3 {
    margin-bottom: 20px;
  }
`;

const AirlineItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
`;

const AirlineLogo = styled.img`
  width: 50px;
  height: auto;
  margin-right: 10px;
`;

const AirlineInfo = styled.div`
  strong {
    display: block;
    color: #000;
  }
  font-size: 14px;
  color: gray;
`;

const popularAirlines = [
  {
    name: "Qatar Airways",
    logo: "https://www.gstatic.com/flights/airline_logos/70px/QR.png",
    sourceAirport: "IKA",
  },
  {
    name: "Pegasus",
    logo: "https://www.gstatic.com/flights/airline_logos/70px/PC.png",
    sourceAirport: "IKA",
  },
  {
    name: "Iraqi",
    logo: "https://www.gstatic.com/flights/airline_logos/70px/IA.png",
    sourceAirport: "IKA",
  },
];

const PopularAirlines = ({ origin }) => {
  // useEffect(() => {
  //   if (userLocation) {
  //     const fetchAirlines = async () => {
  //       const airlines = await fetchPopularAirlines(userLocation); // Fetch airlines from the API
  //       console.log("airlines: ", airlines);
  //       setPopularAirlines(airlines?.data); // Set the fetched airlines to state
  //     };
  //     fetchAirlines();
  //   }
  // }, [userLocation]);

  return (
    <Container>
      <h3>Popular Airlines with Direct Flights from {origin}</h3>
      <ul>
        {popularAirlines.map((airline, index) => (
          <AirlineItem key={index}>
            <AirlineLogo src={airline.logo} alt={`${airline.name} logo`} />
            <AirlineInfo>
              <strong>{airline.name}</strong>
              <div>Fly from ({airline.sourceAirport})</div>
            </AirlineInfo>
          </AirlineItem>
        ))}
      </ul>
    </Container>
  );
};

export default PopularAirlines;
