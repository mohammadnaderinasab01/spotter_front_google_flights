import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ButtonsContainer from "./ButtonsContainer";
import FlightsList from "./FlightsList";
import { fetchFlights } from "../../../services/APIs";
import { useSearchParams } from "react-router";
import CircularProgress from "@mui/material/CircularProgress";
import { formatMoney, formatDate } from "../../../utils";

const FoundedResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 720px;
  margin: 0 auto;
  & .loading-container {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
  & > button {
    width: calc(100% - 32px);
    height: 40px;
    margin-bottom: 16px;
    background-color: var(--color-white);
    outline: none;
    border: 1px solid var(--color-snow-tiger);
    border-radius: 8px;
    align-self: center;
  }
`;

const FoundedResults = () => {
  const [params] = useSearchParams();

  const [topFlights, setTopFlights] = useState();
  const [cheapestFlights, setCheapestFlights] = useState();
  const [otherFlights, setOtherFlights] = useState();
  const [moreFlights, setMoreFlights] = useState();
  const [isMoreFlightsShow, setIsMoreFlightsShow] = useState(false);
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
    if (
      topFlightsActiveButton === "other" ||
      topFlightsActiveButton === "more"
    ) {
      setOtherFlightsLoading(true);
    } else {
      setTopFlightsLoading(true);
    }
    try {
      let date = params.get("date");
      if (date || date !== "") {
        try {
          date = formatDate(params.get("date"));
        } catch {
          date = formatDate(new Date());
        }
      }
      let returnDate = params.get("returnDate");
      if (returnDate || returnDate !== "") {
        try {
          returnDate = formatDate(params.get("returnDate"));
        } catch {
          returnDate = null;
        }
      }
      const data = await fetchFlights(
        params.get("originSkyId"),
        params.get("destinationSkyId"),
        params.get("originEntityId"),
        params.get("destinationEntityId"),
        date,
        returnDate,
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
      if (topFlightsActiveButton === "best") {
        setTopFlights(data.data);
      } else if (topFlightsActiveButton === "cheapest") {
        setCheapestFlights(data.data);
      } else if (topFlightsActiveButton === "other") {
        setOtherFlights(data.data);
      } else if (topFlightsActiveButton === "more") {
        setMoreFlights(data.data);
      }
    } catch (err) {
      if (
        topFlightsActiveButton === "other" ||
        topFlightsActiveButton === "more"
      ) {
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
    console.log(
      "moreFlights?.itineraries?.length: ",
      moreFlights?.itineraries?.length
    );
    console.log(
      "otherFlights?.itineraries?.length: ",
      otherFlights?.itineraries?.length
    );
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
        <FlightsList
          headingTitle={"Other Flights"}
          flights={isMoreFlightsShow ? moreFlights : otherFlights}
        />
      )}
      {!otherFlightsLoading &&
        !otherFlightsError &&
        !(
          moreFlights?.itineraries?.length === undefined &&
          otherFlights?.itineraries?.length === undefined
        ) &&
        !(
          moreFlights?.itineraries?.length === 0 &&
          otherFlights?.itineraries?.length === 0
        ) && (
          <button
            onClick={() => {
              setIsMoreFlightsShow(!isMoreFlightsShow);
              fetchData("more", 100);
            }}
          >
            View {isMoreFlightsShow ? "Less" : "More"} Flights
          </button>
        )}
    </FoundedResultsWrapper>
  );
};

export default FoundedResults;
