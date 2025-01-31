import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { useState } from "react";
import { Menu, MenuItem, Button } from "@mui/material";
import styled from "styled-components";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useSelector, useDispatch } from "react-redux";
import {
  setTripType,
  setPassengers,
  setCabinClass,
} from "../../../redux/flightSearchSlice";

const DropdownWrapper = styled.div`
  & {
    width: 100%;
    overflow: hidden;
  }
  & > div {
    max-width: fit-content;
  }
  & .MuiInputBase-root.MuiSelect-root::before {
    border: none;
  }
  & .icon-wrapper {
    position: absolute;
    color: var(--color-rolling-stone);
    top: 6px;
  }
`;

export default function Dropdown({ values, icon, value, onChange }) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <DropdownWrapper>
      <Box sx={{ position: "relative" }}>
        <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            variant="standard"
            value={value}
            onChange={handleChange}
            style={{ padding: icon !== undefined && "0 0 0 25px" }}
          >
            {values.map((value) => (
              <MenuItem key={value.key} value={value.val}>
                {value.key}
              </MenuItem>
            ))}
          </Select>
          <div className="icon-wrapper">{icon}</div>
        </FormControl>
      </Box>
    </DropdownWrapper>
  );
}

const FilterBarWrapper = styled.div`
  & {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 16px;
    gap: 14px;
  }
  & > div {
    max-width: fit-content;
  }
  & #demo-simple-select {
    border: none;
  }
`;

export const FilterBar = () => {
  const dispatch = useDispatch();
  const { tripType, passengers, cabinClass } = useSelector(
    (state) => state.flightSearch?.filterBar
  );
  // console.log("tripType: ", tripType);
  // console.log("passengers: ", passengers);
  // console.log("cabinClass: ", cabinClass);

  return (
    <FilterBarWrapper>
      <Dropdown
        values={[
          { key: "Round trip", val: "round_trip" },
          { key: "One-way", val: "one_way" },
          // { key: "Multi-city", val: "multi_city" },
        ]}
        value={tripType}
        onChange={(value) => dispatch(setTripType(value))}
        icon={<SyncAltIcon fontSize="small" />}
      />
      <Dropdown
        values={[
          { key: 1, val: 1 },
          { key: 2, val: 2 },
          { key: 3, val: 3 },
          { key: 4, val: 4 },
          { key: 5, val: 5 },
        ]}
        value={passengers}
        onChange={(value) => dispatch(setPassengers(value))}
        icon={<PersonOutlineIcon fontSize="small" />}
      />
      <Dropdown
        values={[
          { key: "Economy", val: "economy" },
          { key: "Premium economy", val: "premium_economy" },
          { key: "Business", val: "business" },
          { key: "First", val: "first" },
        ]}
        value={cabinClass}
        onChange={(value) => dispatch(setCabinClass(value))}
      />
    </FilterBarWrapper>
  );
};
