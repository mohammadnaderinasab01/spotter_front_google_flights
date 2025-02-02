import styled from "styled-components";
import FlightIcon from "@mui/icons-material/Flight";
import { useDispatch } from "react-redux";
import {
  setDestination,
  setDestinationEntityId,
  setDestinationSkyId,
  setOrigin,
  setOriginEntityId,
  setOriginSkyId,
} from "../../redux/flightSearchSlice";

const AirportsSearchBoxWrapper = styled.div`
  position: absolute;
  z-index: 100;
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(60, 64, 67, 0.3),
    0 4px 8px 3px rgba(60, 64, 67, 0.15);
  border-radius: 4px;
  width: calc(100vw - 32px);
  max-width: 450px;
  top: 36px;
  left: ${(props) => props.type === "origin" && "0px"};
  right: ${(props) => props.type === "destination" && "0px"};
  max-height: 200px;
  overflow: scroll;
`;

const ResultItem = styled.div`
  padding: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #f0f0f0; // Hover effect
  }

  .airport-name {
    font-weight: bold;
    font-size: 16px;
  }

  .airport-code {
    font-size: 14px;
    color: #666;
  }

  .distance {
    font-size: 12px;
    color: #999;
  }
`;

export const AirportsSearchBox = ({ type, results }) => {
  const dispatch = useDispatch();

  const handleSetDestinationAirportInfo = (skyId, entityId, cityName) => {
    if (type === "origin") {
      dispatch(setOriginSkyId(skyId));
      dispatch(setOriginEntityId(entityId));
      if (cityName !== undefined && cityName !== null && cityName !== "") {
        dispatch(setOrigin(cityName));
      }
    } else if (type === "destination") {
      dispatch(setDestinationSkyId(skyId));
      dispatch(setDestinationEntityId(entityId));
      if (cityName !== undefined && cityName !== null && cityName !== "") {
        dispatch(setDestination(cityName));
      }
    }
  };
  return (
    <AirportsSearchBoxWrapper type={type}>
      {results.map((airport) => (
        <ResultItem
          key={airport.skyId}
          onClick={() =>
            handleSetDestinationAirportInfo(
              airport?.skyId,
              airport?.entityId,
              airport?.navigation?.relevantHotelParams?.localizedName
            )
          }
        >
          <FlightIcon />
          <div className="airport-name">{airport.name}</div>
          <div className="distance">{airport?.presentation?.title}</div>
          <div className="airport-code">{airport?.skyId}</div>
        </ResultItem>
      ))}
    </AirportsSearchBoxWrapper>
  );
};
