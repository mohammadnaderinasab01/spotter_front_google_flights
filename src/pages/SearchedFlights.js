import styled from "styled-components";
import { Explorer } from "../components/searchedFlights/explorer/Explorer";
import FoundedResults from "../components/searchedFlights/foundedResults/FoundedResults";

const SearchedFlightsWrapper = styled.div`
  /* padding: 20px; // Example styling
  background-color: #f9f9f9; // Example background color
  border-radius: 8px; // Example border radius */
  overflow: hidden;
`;

export default function SearchedFlights() {
  return (
    <SearchedFlightsWrapper>
      <Explorer />
      <FoundedResults />
    </SearchedFlightsWrapper>
  );
}
