import styled from "styled-components";
import { FilterBar } from "./FilterBar";
import { FlightSearchInputs } from "../../common/FlightSearchInputs";

const ExplorerWrapper = styled.div`
  & {
    border-radius: 0 0 16px 16px;
    box-shadow: 0 2px 2px 0 rgba(60, 64, 67, 0.3),
      0 2px 6px -6px rgba(60, 64, 67, 0.15);
    padding: 0 0 12px;
    margin: 16px 0;
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
      <div className="explore-bar">
        <FilterBar />
        <FlightSearchInputs page={"search"} />
      </div>
    </ExplorerWrapper>
  );
};
