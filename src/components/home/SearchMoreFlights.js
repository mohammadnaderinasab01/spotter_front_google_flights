import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import styled from "styled-components";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const SearchMoreFlights = ({ origin }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <SearchMoreFlightsWrapper>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              "& .MuiTabs-flexContainer": {
                flexWrap: "no-wrap",
              },
            }}
          >
            <Tab
              label={`Popular destinations from ${origin}`}
              {...a11yProps(0)}
            />
            <Tab label="Flights from other cities" {...a11yProps(1)} />
            <Tab label={`Flights to ${origin}`} {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          Item One
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Item Two
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
      </Box>
    </SearchMoreFlightsWrapper>
  );
};

const SearchMoreFlightsWrapper = styled.div`
  padding: 16px;

  & .MuiTabs-scroller {
    overflow: scroll !important;
  }
  & .MuiTabs-scroller::-webkit-scrollbar {
    display: none;
  }
  & .MuiTabs-scroller button {
    text-transform: none;
  }
`;

export default SearchMoreFlights;
