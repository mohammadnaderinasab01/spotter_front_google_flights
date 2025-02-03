import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "styled-components";
import {
  convertMinutesNumberToString,
  formatMoney,
  getHoursAndMinutesFromDate,
} from "../../../utils";
import { useSelector } from "react-redux";

const FlightsListContainer = styled.div`
  border-radius: 5px;
  padding: 0 16px 16px;
  background-color: var(--color-white);
  display: flex;
  flex-direction: column;
  gap: 16px;

  & > div,
  & > div > div {
    padding: 0;
  }
  & > div > div > div {
    width: 100%;
  }
  & > h3 {
    align-self: center;
  }
`;

const FlightItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid var(--color-snow-tiger);

  &:last-child {
    border-bottom: none;
  }

  padding: 16px;
  & > h3 {
    font-size: 1.2rem;
  }
  & .item-accordion {
    box-shadow: none;
    border-bottom: 1px solid var(--color-snow-tiger);
    margin: 0;
  }
  & .item-accordion:last-child {
    border: none;
  }
  & .Mui-expanded {
    margin: 0 !important;
  }

  & .MuiAccordionSummary-content {
    width: 100%;
    display: flex;
  }
  & .MuiAccordionSummary-content > div {
    width: 100%;
    display: flex;
  }
  & .MuiAccordionSummary-content > div:nth-child(1) {
    width: 26px;
    height: 26px;
    display: flex;
    margin-right: 12px;
  }
  & .MuiAccordionSummary-content > div:nth-child(2) {
    flex-direction: column;
    gap: 6px;
  }
  & .MuiAccordionSummary-content > div:nth-child(2) > div {
    display: flex;
  }
  & .MuiAccordionSummary-content > div:nth-child(2) > div > span {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  &
    .MuiAccordionSummary-content
    > div:nth-child(2)
    > div
    > span
    > span:nth-child(1) {
    font-weight: 600;
    font-size: 0.9rem;
  }
  & .MuiAccordionSummary-content > div:nth-child(2) > div > p {
    white-space: nowrap;
  }
  & .MuiAccordionSummary-content > div:nth-child(2) i {
    font-size: 1.2rem;
    margin-top: -4px;
  }
  & .MuiAccordionSummary-content > div:nth-child(3) {
    display: flex;
    justify-content: flex-end;
  }
  & .MuiAccordionSummary-content > div:nth-child(3) > p {
    white-space: nowrap;
    font-size: 0.9rem;
    font-weight: 600;
  }
`;
const FlightsListHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const List = styled.div`
  border: 1px solid var(--color-snow-tiger);
  padding: 10px;
  border-radius: 8px;
`;

const FlightsList = ({ flights, headingTitle }) => {
  // console.log(item.durationInMinutes)
  // console.log(flights?.itineraries[0].legs);
  const currency = useSelector((state) => state.flightSearch.currency);
  return (
    <FlightsListContainer>
      <FlightsListHeader>
        <h3>{headingTitle}</h3>
      </FlightsListHeader>
      <List>
        {flights?.itineraries?.map((flight, index) => (
          <FlightItem key={flight.id}>
            <Accordion className="item-accordion">
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <div>
                  {flight.legs?.length > 0 &&
                    flight.legs[0]?.carriers?.marketing.length > 0 && (
                      <img
                        src={flight.legs[0]?.carriers?.marketing[0]?.logoUrl}
                      />
                    )}
                </div>
                <div>
                  {flight.legs?.length > 0 && (
                    <>
                      <div>
                        <span>
                          <span>
                            {getHoursAndMinutesFromDate(
                              flight.legs[0]?.departure
                            )}
                          </span>
                          <span>{flight.legs[0]?.origin?.displayCode}</span>
                        </span>
                        {flight.legs.length === 1 ? <i>→</i> : <i>→→</i>}
                        <span>
                          <span>
                            {getHoursAndMinutesFromDate(
                              flight.legs[0]?.arrival
                            )}
                          </span>
                          <span>
                            {flight.legs[0]?.destination?.displayCode}
                          </span>
                        </span>
                      </div>
                      <div>
                        {flight.legs[0]?.segments.length < 1 ? (
                          <p>Non-stop</p>
                        ) : (
                          <p>{flight.legs[0]?.segments.length} stop</p>
                        )}
                        <span>&nbsp;.&nbsp;</span>
                        <p>
                          {convertMinutesNumberToString(
                            flight.legs
                              .map((item) => item.durationInMinutes)
                              .reduce((partialSum, a) => partialSum + a, 0)
                          )}
                        </p>
                      </div>
                    </>
                  )}
                </div>
                <div>
                  <p>
                    {currency} {formatMoney(Math.ceil(flight.price.raw))}
                  </p>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>details</Typography>
              </AccordionDetails>
            </Accordion>
          </FlightItem>
        ))}
      </List>
      {(flights?.itineraries.length === 0 || !flights?.itineraries) && (
        <h3>No Data Found</h3>
      )}
    </FlightsListContainer>
  );
};

export default FlightsList;
