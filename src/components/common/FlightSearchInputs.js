import styled from "styled-components";
import { TextField, IconButton } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { useSelector, useDispatch } from "react-redux";
import {
  setOrigin,
  setDestination,
  setCurrency,
  setAirportSearchQuery,
  setDestinationSkyId,
  setDestinationEntityId,
  setOriginSkyId,
  setOriginEntityId,
  setDepartureDate,
  setReturnDate,
} from "../../redux/flightSearchSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { AirportsSearchBox } from "./AirportsSearchBox";
import { searchAirports } from "../../services/APIs";
import { Link, useSearchParams } from "react-router";
import { formatDate } from "../../utils";

const SearchInputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  background-color: var(--color-white);
  border-radius: 8px;
  margin: ${(props) => (props.page === "home" ? "0 0 16px" : "0")};
  @media (min-width: 800px) {
    flex-direction: row;
  }
  .location-inputs {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
  }

  .date-inputs {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
  }
  & > a {
    position: absolute;
    left: 50%;
    bottom: -10px;
    transform: translate(-50%, 50%);
    background-color: var(--color-royal-blue);
    color: var(--color-white);
    border: none;
    border-radius: 24px;
    padding: 12px 24px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    width: auto;
    min-width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (min-width: 800px) {
      bottom: 0;
    }
  }

  & > a:hover {
    background-color: var(--color-aarhusian-sky);
  }
  & > a.disabled {
    border: 1px solid var(--color-million-grey);
    background-color: var(--color-cerebral-grey);
    color: var(--color-squant);
  }
`;

const LocationInputsWrapper = styled.div`
  position: relative;
  display: flex;
  gap: 8px;
  width: 100%;
`;

const TextFieldWrapper = styled.div`
  width: 100%;
  position: relative;

  & > span {
    font-size: 0.7rem;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
    z-index: 1;
    position: absolute;
  }
`;

const StyledTextField = styled(TextField)`
  & .MuiInputBase-root {
    background: white;
    border: 1px solid var(--color-snow-tiger);
    border-radius: 4px;
    padding: 8px 12px;
    height: 36px;

    &:hover {
      border-color: var(--color-metallic);
    }

    &.Mui-focused {
      border-color: var(--color-royal-blue);
      background: white;
    }

    &::before,
    &::after {
      display: none;
    }
  }

  & .MuiInputBase-input {
    padding: 0;
    font-size: 14px;
    color: var(--color-shark);
  }
`;

const StyledSwapButton = styled(IconButton)`
  && {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
    padding: 4px;
    border: 1px solid var(--color-snow-tiger);
    border-radius: 50%;
    background-color: white;
    width: 28px;
    height: 28px;
    z-index: 1;

    &:hover {
      background-color: var(--color-doctor);
      border-color: var(--color-metallic);
    }

    & .MuiSvgIcon-root {
      font-size: 16px;
      color: var(--color-shuttle-gray);
    }
  }
`;

const DateInputsWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;

  .date-input {
    flex: 1;
    position: relative;

    .react-datepicker-wrapper {
      width: 100%;
    }

    input {
      width: 100%;
      height: 36px;
      padding: 8px 12px;
      border: 1px solid var(--color-snow-tiger);
      border-radius: 4px;
      font-size: 14px;
      color: var(--color-shark);
      outline: none;
      background: white;
      padding-right: 32px;
      cursor: pointer;

      &:hover {
        border-color: var(--color-metallic);
      }

      &:focus {
        border-color: var(--color-royal-blue);
      }
    }

    .calendar-icon {
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--color-shuttle-gray);
      font-size: 20px;
      pointer-events: none;
    }
  }
  .date-input:nth-child(1) .react-datepicker-popper {
    left: 50px !important;
  }
  .date-input:nth-child(2) .react-datepicker-popper {
    left: -50px !important;
  }

  .react-datepicker {
    font-family: inherit;
    border-color: var(--color-snow-tiger);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .react-datepicker__header {
    background-color: white;
    border-bottom: none;
  }

  .react-datepicker__day--selected {
    background-color: var(--color-royal-blue);
  }

  .react-datepicker__day:hover {
    background-color: var(--color-porcelain);
  }
`;

export const FlightSearchInputs = ({ page }) => {
  const [locationsInputSelected, setLocationsInputSelected] = useState("");
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const { currency } = useSelector((state) => state.flightSearch);
  const { tripType, cabinClass } = useSelector(
    (state) => state.flightSearch.filterBar
  );
  const {
    originSkyId,
    destinationSkyId,
    originEntityId,
    destinationEntityId,
    departureDate,
    returnDate,
  } = useSelector((state) => state.flightSearch.searchDetail);

  const { origin, destination } = useSelector((state) => state.flightSearch);
  // console.log("origin: ", origin);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [originResults, setOriginResults] = useState([]);
  const [destinationResults, setDestinationResults] = useState([]);

  const initialAirportsSearch = async () => {
    if (origin !== "") {
      const results = await searchAirports(origin);
      setOriginResults(results.data);
    }
  };

  const handleSwap = () => {
    const tempOrigin = origin;
    dispatch(setOrigin(destination));
    dispatch(setDestination(tempOrigin));
  };

  const getUserLocation = () => {
    setIsLoadingLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            console.log("mored: ", data);
            // Get the city name from OpenStreetMap response
            const cityName =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              data.address.state ||
              undefined;
            if (cityName !== undefined) {
              dispatch(setOrigin(cityName));
            }
            console.log("boolean: ", cityName !== undefined);
            getLocationByIP(cityName !== undefined);
          } catch (error) {
            console.error("Error getting location:", error);
            // Fallback to IP-based location
            getLocationByIP(false);
          } finally {
            setIsLoadingLocation(false);
          }
        },
        (error) => {
          console.error("Error getting geolocation:", error);
          // Fallback to IP-based location
          getLocationByIP(false);
        }
      );
    } else {
      getLocationByIP(false);
    }
  };

  const getLocationByIP = async (isOriginSet) => {
    try {
      const response = await fetch("https://api.db-ip.com/v2/free/self");
      const data = await response.json();
      if (data.stateProv !== undefined) {
        if (!isOriginSet) {
          dispatch(setOrigin(data.stateProv));
        }
        const currencyResponse = await fetch(
          `https://restcountries.com/v3.1/name/${data.countryName}`
        );
        const currencyData = await currencyResponse.json();
        const currency = Object.keys(currencyData[0].currencies)[0];
        dispatch(setCurrency(currency)); // Update currency in Redux store
      }
    } catch (error) {
      console.error("Error getting IP location:", error);
    } finally {
      setIsLoadingLocation(false);
    }
  };

  useEffect(() => {
    if (params.get("originSkyId") === null) {
      getUserLocation();
    }
    if (params.get("originSkyId")) {
      dispatch(setOriginSkyId(params.get("originSkyId")));
    }
    if (params.get("destinationSkyId")) {
      dispatch(setDestinationSkyId(params.get("destinationSkyId")));
    }
    if (params.get("origin")) {
      dispatch(setOrigin(params.get("origin")));
    }
    if (params.get("destination")) {
      dispatch(setDestination(params.get("destination")));
    }
  }, []);

  useEffect(() => {
    initialAirportsSearch();
  }, [origin]);

  const handleOriginChange = async (e) => {
    const value = e.target.value;
    dispatch(setOrigin(value));
    dispatch(setAirportSearchQuery(value));

    dispatch(setOriginSkyId(""));
    dispatch(setOriginEntityId(""));
    if (value) {
      const results = await searchAirports(value);
      setOriginResults(results.data);
    } else {
      setOriginResults([]);
    }
  };

  const handleDestinationChange = async (e) => {
    const value = e.target.value;
    dispatch(setDestination(value));
    dispatch(setAirportSearchQuery(value));

    dispatch(setDestinationSkyId(""));
    dispatch(setDestinationEntityId(""));
    if (value) {
      const results = await searchAirports(value);
      setDestinationResults(results.data);
    } else {
      setDestinationResults([]);
    }
  };

  return (
    <SearchInputsWrapper page={page} elevation={0}>
      <LocationInputsWrapper>
        <TextFieldWrapper>
          <StyledTextField
            variant="standard"
            placeholder={
              isLoadingLocation ? "Getting location..." : "Where from?"
            }
            fullWidth
            value={origin}
            onChange={handleOriginChange}
            onFocus={() => setLocationsInputSelected("origin")}
            onBlur={() => {
              setTimeout(() => {
                if (locationsInputSelected === "origin") {
                  setLocationsInputSelected("");
                }
              }, 300);
            }}
            disabled={page === "search"}
          />
          {locationsInputSelected === "origin" && originResults.length > 0 && (
            <AirportsSearchBox type="origin" results={originResults} />
          )}
          {originSkyId !== "" && <span>{originSkyId}</span>}
        </TextFieldWrapper>
        {page === "home" && (
          <StyledSwapButton size="small" onClick={handleSwap}>
            <SwapHorizIcon />
          </StyledSwapButton>
        )}
        <TextFieldWrapper>
          <StyledTextField
            variant="standard"
            placeholder="Where to?"
            fullWidth
            value={destination}
            onChange={handleDestinationChange}
            onFocus={() => setLocationsInputSelected("destination")}
            onBlur={() => {
              setTimeout(() => {
                if (locationsInputSelected === "destination") {
                  setLocationsInputSelected("");
                }
              }, 300);
            }}
            disabled={page === "search"}
          />
          {locationsInputSelected === "destination" &&
            destinationResults.length > 0 && (
              <AirportsSearchBox
                type="destination"
                results={destinationResults}
              />
            )}
          {destinationSkyId !== "" && <span>{destinationSkyId}</span>}
        </TextFieldWrapper>
      </LocationInputsWrapper>
      <div className="date-inputs">
        <DateInputsWrapper>
          <div className="date-input">
            <DatePicker
              selected={new Date(departureDate)}
              onChange={(date) => {
                dispatch(setDepartureDate(formatDate(date)));
                if (new Date(date) > new Date(returnDate)) {
                  dispatch(setReturnDate(formatDate(date)));
                }
              }}
              disabled={page === "search"}
              dateFormat="EEE d MMM"
              placeholderText="Departure"
              minDate={new Date()}
            />
          </div>

          {tripType === "round_trip" && (
            <div className="date-input">
              <DatePicker
                selected={new Date(returnDate)}
                onChange={(date) => dispatch(setReturnDate(formatDate(date)))}
                dateFormat="EEE d MMM"
                placeholderText="Return"
                minDate={new Date(departureDate)}
                disabled={page === "search"}
              />
            </div>
          )}
        </DateInputsWrapper>
      </div>
      {page === "home" && (
        <Link
          className={
            (!origin ||
              origin === "" ||
              !destination ||
              destination === "" ||
              !departureDate ||
              departureDate === "") &&
            "disabled"
          }
          to={`/search?origin=${origin}&destination=${destination}&originSkyId=${originSkyId}&destinationSkyId=${destinationSkyId}&originEntityId=${originEntityId}&destinationEntityId=${destinationEntityId}&date=${departureDate}&returnDate=${returnDate}&cabinClass=${cabinClass}&currency=${currency}`}
        >
          <SearchIcon
            sx={{
              fontSize: 24,
              position: "relative",
              top: "-1px",
              left: "-6px",
            }}
          />
          Explore
        </Link>
      )}
    </SearchInputsWrapper>
  );
};
