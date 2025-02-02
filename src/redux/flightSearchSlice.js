import { createSlice } from "@reduxjs/toolkit";
import { formatDate } from "../utils";

const initialState = {
  filterBar: {
    tripType: "round_trip",
    passengers: 1,
    cabinClass: "economy",
  },
  origin: "",
  destination: "",
  currency: "USD",
  airportSearchQuery: "",
  searchDetail: {
    // originSkyId: "LOND",
    // destinationSkyId: "NYCA",
    // originEntityId: "27544008",
    // destinationEntityId: "27537542",
    // date: "2025-02-04",
    // sortBy: "best",
    originSkyId: "",
    destinationSkyId: "",
    originEntityId: "",
    destinationEntityId: "",
    depDate: formatDate(new Date()),
    turnDate: formatDate(new Date()),
    sortBy: "best",
  },
  topFlightsActiveButton: "best",
};

export const flightSearchSlice = createSlice({
  name: "flightSearch",
  initialState,
  reducers: {
    setTripType: (state, action) => {
      console.log("setTripType: ", action.payload);
      state.filterBar.tripType = action.payload;
    },
    setPassengers: (state, action) => {
      state.filterBar.passengers = action.payload;
    },
    setCabinClass: (state, action) => {
      state.filterBar.cabinClass = action.payload;
    },
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    setOriginSkyId: (state, action) => {
      console.log("setOriginSkyId: ", action.payload);
      state.searchDetail.originSkyId = action.payload;
    },
    setDestinationSkyId: (state, action) => {
      console.log("setDestinationSkyId: ", action.payload);
      state.searchDetail.destinationSkyId = action.payload;
    },
    setOriginEntityId: (state, action) => {
      console.log("setDestinationSkyId: ", action.payload);
      state.searchDetail.originEntityId = action.payload;
    },
    setDestinationEntityId: (state, action) => {
      console.log("setDestinationEntityId: ", action.payload);
      state.searchDetail.destinationEntityId = action.payload;
    },
    setDepDate: (state, action) => {
      state.searchDetail.depDate = action.payload;
    },
    setTurnDate: (state, action) => {
      state.searchDetail.turnDate = action.payload;
    },
    setSortBy: (state, action) => {
      state.searchDetail.sortBy = action.payload;
    },
    setAirportSearchQuery: (state, action) => {
      state.airportSearchQuery = action.payload;
    },
    setTopFlightsActiveButton: (state, action) => {
      state.topFlightsActiveButton = action.payload;
    },
  },
});

export const {
  setTripType,
  setPassengers,
  setCabinClass,
  setOrigin,
  setDestination,
  setCurrency,
  setOriginSkyId,
  setDestinationSkyId,
  setOriginEntityId,
  setDestinationEntityId,
  setDate,
  setSortBy,
  setAirportSearchQuery,
  setTopFlightsActiveButton,
} = flightSearchSlice.actions;
export default flightSearchSlice.reducer;
