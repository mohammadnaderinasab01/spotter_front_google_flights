import styled from "styled-components";
import { TextField, IconButton } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { useSelector, useDispatch } from "react-redux";
import {
  setOrigin,
  setDestination,
  setCurrency,
} from "../../redux/flightSearchSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchInputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  margin: ${(props) => (props.page === "home" ? "0 0 16px" : "0")};

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
`;

const LocationInputsWrapper = styled.div`
  position: relative;
  display: flex;
  gap: 8px;
  width: 100%;
`;

const StyledTextField = styled(TextField)`
  & .MuiInputBase-root {
    background: white;
    border: 1px solid #dadce0;
    border-radius: 4px;
    padding: 8px 12px;
    height: 36px;

    &:hover {
      border-color: #bdc1c6;
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
    border: 1px solid #dadce0;
    border-radius: 50%;
    background-color: white;
    width: 28px;
    height: 28px;
    z-index: 1;

    &:hover {
      background-color: #f8f9fa;
      border-color: #bdc1c6;
    }

    & .MuiSvgIcon-root {
      font-size: 16px;
      color: #5f6368;
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
      border: 1px solid #dadce0;
      border-radius: 4px;
      font-size: 14px;
      color: var(--color-shark);
      outline: none;
      background: white;
      padding-right: 32px;
      cursor: pointer;

      &:hover {
        border-color: #bdc1c6;
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

  .react-datepicker {
    font-family: inherit;
    border-color: #dadce0;
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

const ExploreButton = styled.button`
  position: absolute;
  left: 50%;
  bottom: -10px;
  transform: translate(-50%, 50%);
  background-color: var(--color-royal-blue);
  color: #fff;
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

  &:hover {
    background-color: #1557b0;
  }
`;

export const FlightSearchInputs = ({ page }) => {
  const dispatch = useDispatch();
  const { tripType } = useSelector((state) => state.flightSearch.filterBar);
  const { origin, destination } = useSelector((state) => state.flightSearch);
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

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
          } catch (error) {
            console.error("Error getting location:", error);
            // Fallback to IP-based location
            getLocationByIP();
          } finally {
            setIsLoadingLocation(false);
          }
        },
        (error) => {
          console.error("Error getting geolocation:", error);
          // Fallback to IP-based location
          getLocationByIP();
        }
      );
    } else {
      getLocationByIP();
    }
  };

  const getLocationByIP = async () => {
    try {
      const response = await fetch("https://api.db-ip.com/v2/free/self");
      const data = await response.json();
      if (data.stateProv !== undefined) {
        dispatch(setOrigin(data.stateProv));
        // Fetch currency based on country name
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
    getUserLocation();
  }, []);

  return (
    <SearchInputsWrapper page={page} elevation={0}>
      <LocationInputsWrapper>
        <StyledTextField
          variant="standard"
          placeholder={
            isLoadingLocation ? "Getting location..." : "Where from?"
          }
          fullWidth
          value={origin}
          onChange={(e) => dispatch(setOrigin(e.target.value))}
        />
        <StyledSwapButton size="small" onClick={handleSwap}>
          <SwapHorizIcon />
        </StyledSwapButton>
        <StyledTextField
          variant="standard"
          placeholder="Where to?"
          fullWidth
          value={destination}
          onChange={(e) => dispatch(setDestination(e.target.value))}
        />
      </LocationInputsWrapper>
      <div className="date-inputs">
        <DateInputsWrapper>
          <div className="date-input">
            <DatePicker
              selected={departureDate}
              onChange={(date) => setDepartureDate(date)}
              dateFormat="EEE d MMM"
              placeholderText="Departure"
              minDate={new Date()}
            />
          </div>

          {tripType === "round_trip" && (
            <div className="date-input">
              <DatePicker
                selected={returnDate}
                onChange={(date) => setReturnDate(date)}
                dateFormat="EEE d MMM"
                placeholderText="Return"
                minDate={departureDate}
              />
            </div>
          )}
        </DateInputsWrapper>
      </div>
      {page === "home" && (
        <ExploreButton>
          <SearchIcon
            sx={{
              fontSize: 24,
              position: "relative",
              top: "-1px",
              left: "-6px",
            }}
          />
          Explore
        </ExploreButton>
      )}
    </SearchInputsWrapper>
  );
};
