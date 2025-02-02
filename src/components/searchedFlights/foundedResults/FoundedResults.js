import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ButtonsContainer from "./ButtonsContainer";
import FlightsList from "./FlightsList";
import { fetchFlights } from "../../../services/APIs";
import { useSearchParams } from "react-router";
import CircularProgress from "@mui/material/CircularProgress";
import { formatMoney } from "../../../utils";

const FoundedResultsWrapper = styled.div`
  & .loading-container {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
`;

const FoundedResults = () => {
  const [params] = useSearchParams();

  const [topFlights, setTopFlights] = useState();
  const [cheapestFlights, setCheapestFlights] = useState();
  const [otherFlights, setOtherFlights] = useState();
  const [topFlightsLoading, setTopFlightsLoading] = useState(false);
  const [topFlightsError, setTopFlightsError] = useState(null);
  const [otherFlightsLoading, setOtherFlightsLoading] = useState(false);
  const [otherFlightsError, setOtherFlightsError] = useState(null);

  const topFlightsActiveButton = useSelector(
    (state) => state.flightSearch.topFlightsActiveButton
  );

  const { currency, cheapestPrice } = useSelector(
    (state) => state.flightSearch
  );

  const fetchData = async (topFlightsActiveButton, limit) => {
    if (topFlightsActiveButton === "other") {
      setOtherFlightsLoading(true);
    } else {
      setTopFlightsLoading(true);
    }
    try {
      const data = await fetchFlights(
        params.get("originSkyId"),
        params.get("destinationSkyId"),
        params.get("originEntityId"),
        params.get("destinationEntityId"),
        params.get("date"),
        params.get("cabinClass"),
        params.get("adults"),
        topFlightsActiveButton === "best"
          ? "best"
          : topFlightsActiveButton === "cheapest"
          ? "price_low"
          : null,
        params.get("currency"),
        limit
      );
      console.log("res: ", data.data);
      if (topFlightsActiveButton === "best") {
        setTopFlights(data.data);
      } else if (topFlightsActiveButton === "cheapest") {
        setCheapestFlights(data.data);
      } else if (topFlightsActiveButton === "other") {
        setOtherFlights(data.data);
      }
    } catch (err) {
      if (topFlightsActiveButton === "other") {
        setOtherFlightsError(err.message);
      } else {
        setTopFlightsError(err.message);
      }
    } finally {
      setTopFlightsLoading(false);
      setOtherFlightsLoading(false);
    }
  };

  useEffect(() => {
    if (
      (topFlightsActiveButton === "best" &&
        (!topFlights?.length || topFlights.length === 0)) ||
      (topFlightsActiveButton === "cheapest" &&
        (!cheapestFlights?.length || cheapestFlights.length === 0))
    ) {
      fetchData(topFlightsActiveButton, 3);
    }
  }, [topFlightsActiveButton]);

  useEffect(() => {
    fetchData("cheapest", 3);
    fetchData("other", 10);
  }, []);

  return (
    <FoundedResultsWrapper>
      {cheapestFlights?.itineraries &&
        cheapestFlights?.itineraries.length &&
        cheapestFlights?.itineraries.length > 0 && (
          <ButtonsContainer
            cheapestPrice={formatMoney(
              Math.ceil(cheapestFlights?.itineraries[0]?.price.raw)
            )}
          />
        )}
      {topFlightsLoading && (
        <div className="loading-container">
          <CircularProgress />
        </div>
      )}
      {topFlightsError && <div>Error fetching flights: {topFlightsError}</div>}
      {!topFlightsLoading && !topFlightsError && (
        <FlightsList
          headingTitle={"Top Flights"}
          flights={
            topFlightsActiveButton === "best"
              ? topFlights
              : topFlightsActiveButton === "cheapest"
              ? cheapestFlights
              : topFlights
          }
        />
      )}
      {otherFlightsLoading && (
        <div className="loading-container">
          <CircularProgress />
        </div>
      )}
      {otherFlightsError && (
        <div>Error fetching flights: {otherFlightsError}</div>
      )}
      {!otherFlightsLoading && !otherFlightsError && (
        <FlightsList headingTitle={"Other Flights"} flights={otherFlights} />
      )}
    </FoundedResultsWrapper>
  );
};

export default FoundedResults;
