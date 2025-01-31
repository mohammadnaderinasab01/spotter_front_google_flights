import { configureStore } from "@reduxjs/toolkit";
import flightSearchReducer from "./flightSearchSlice";

export const store = configureStore({
  reducer: {
    flightSearch: flightSearchReducer,
  },
});
