import styled from "styled-components";
import { FilterBar } from "./FilterBar";
import { FlightSearchInputs } from "../../common/FlightSearchInputs";

const ExplorerWrapper = styled.div`
  & {
    border-radius: 0 0 16px 16px;
    box-shadow: 0 2px 2px 0 rgba(60, 64, 67, 0.3),
      0 2px 6px -6px rgba(60, 64, 67, 0.15);
    padding: 0 0 12px;
    margin: 0 0 16px;
  }
  & > .header-img-wrapper {
    margin: 0 auto 40px;
    width: 100%;
    height: 25vw;
    max-width: 1248px;
    min-height: 144px;
    max-height: 288px;
    position: relative;
    background-image: url("/images/flights_nc_4.svg");
    background-size: cover;
    background-position: center;
    margin-bottom: -40px;
    background-repeat: no-repeat;
  }
  & > .explore-bar {
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: var(--color-athens-gray);
  }
  & > .explore-bar > h3 {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.25rem;
    color: var(--color-shark);
    font-weight: 400;
  }
`;

export const Explorer = () => {
  return (
    <ExplorerWrapper>
      <div className="header-img-wrapper"></div>
      <div className="explore-bar">
        <h3>Flights</h3>
        <FilterBar />
        <FlightSearchInputs page={"home"} />
      </div>
    </ExplorerWrapper>
  );
};
