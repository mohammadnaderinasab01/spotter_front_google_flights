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
  currency: "IRR",
  cheapestPrice: 2988000,
  searchDetail: {
    // originSkyId: "LOND",
    // destinationSkyId: "NYCA",
    // originEntityId: "27544008",
    // destinationEntityId: "27537542",
    // date: "2025-02-04",
    // cabinClass: "economy",
    // adults: 1,
    // sortBy: "best",
    originSkyId: "",
    destinationSkyId: "",
    originEntityId: "",
    destinationEntityId: "",
    depDate: formatDate(new Date()),
    turnDate: formatDate(new Date()),
    cabinClass: "economy",
    adults: 1,
    sortBy: "best",
  },
};

export const flightSearchSlice = createSlice({
  name: "flightSearch",
  initialState,
  reducers: {
    setTripType: (state, action) => {
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
    setCheapestPrice: (state, action) => {
      state.cheapestPrice = action.payload;
    },
    setOriginSkyId: (state, action) => {
      state.searchDetail.originSkyId = action.payload;
    },
    setDestinationSkyId: (state, action) => {
      state.searchDetail.destinationSkyId = action.payload;
    },
    setOriginEntityId: (state, action) => {
      state.searchDetail.originEntityId = action.payload;
    },
    setDestinationEntityId: (state, action) => {
      state.searchDetail.destinationEntityId = action.payload;
    },
    setDepDate: (state, action) => {
      state.searchDetail.depDate = action.payload;
    },
    setTurnDate: (state, action) => {
      state.searchDetail.turnDate = action.payload;
    },
    setAdults: (state, action) => {
      state.searchDetail.adults = action.payload;
    },
    setSortBy: (state, action) => {
      state.searchDetail.sortBy = action.payload;
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
  setCheapestPrice,
  setOriginSkyId,
  setDestinationSkyId,
  setOriginEntityId,
  setDestinationEntityId,
  setDate,
  setAdults,
  setSortBy,
} = flightSearchSlice.actions;
export default flightSearchSlice.reducer;
