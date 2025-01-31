import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ButtonsContainer from "./ButtonsContainer";
import TopFlights from "./TopFlights";
import { formatMoney } from "../../../utils";
import { fetchFlights } from "../../../services/APIs";

const FoundedResultsWrapper = styled.div``;

const FoundedResults = () => {
  const [topFlights, setTopFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { currency, cheapestPrice } = useSelector(
    (state) => state.flightSearch
  );

  const originSkyId = "LOND";
  const destinationSkyId = "NYCA";
  const originEntityId = "27544008";
  const destinationEntityId = "27537542";
  const date = "2025-02-04";
  const cabinClass = "economy";
  const adults = 1;
  const sortBy = "best";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchFlights(
          originSkyId,
          destinationSkyId,
          originEntityId,
          destinationEntityId,
          date,
          cabinClass,
          adults,
          sortBy,
          currency
        );
        setTopFlights(data.data.itineraries);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    originSkyId,
    destinationSkyId,
    originEntityId,
    destinationEntityId,
    date,
    cabinClass,
    adults,
    sortBy,
    currency,
  ]);

  return (
    <FoundedResultsWrapper>
      <ButtonsContainer />
      {cheapestPrice && (
        <div>
          Cheapest: {currency} {formatMoney(cheapestPrice)}
        </div>
      )}
      {loading && <div>Loading flights...</div>}
      {error && <div>Error fetching flights: {error}</div>}
      {!loading && !error && <TopFlights flights={topFlights} />}
    </FoundedResultsWrapper>
  );
};

export default FoundedResults;
