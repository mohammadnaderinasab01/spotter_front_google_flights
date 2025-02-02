import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { formatMoney } from "../../../utils";
import InfoIcon from "@mui/icons-material/Info";
import { setTopFlightsActiveButton } from "../../../redux/flightSearchSlice";

const Container = styled.div`
  display: flex;
  margin: 20px 0;
  padding: 0 16px 16px;
  justify-content: center;
  & > button:first-child {
    border-bottom-left-radius: 8px;
    border-top-left-radius: 8px;
  }
  & > button:last-child {
    border-bottom-right-radius: 8px;
    border-top-right-radius: 8px;
  }
  & > .cheapest-price-button > h5 {
    font-weight: normal;
    font-size: 1rem;
    @media (min-width: 460px) {
      margin-bottom: -4px;
    }
  }
  & > .cheapest-price-button > span {
    white-space: nowrap;
    font-size: 0.8rem;
    font-weight: 600;
    @media (min-width: 600px) {
      font-size: 1rem;
      font-weight: bolder;
      margin-bottom: -4px;
    }
  }
  & > .cheapest-price-button > span > span {
    color: var(--color-rolling-stone);
    font-size: 0.8rem;
    margin-right: 4px;
    font-weight: 400;
  }
  & > .cheapest-price-button > div {
    display: flex;
    align-items: center;
    margin-top: 4px;
    gap: 12px;
  }
  & > .cheapest-price-button > div > p {
    display: flex;
    color: #fff;
    font-size: 0.7rem;
    font-weight: bolder;
    padding: 6px;
    border-radius: 16px;
    background-color: var(--color-royal-blue);
  }
`;

const Button = styled.button`
  width: 50%;
  max-width: 368px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border: ${(props) =>
    props.active ? "1px solid #007bff" : "1px solid #dadce0"};
  border-bottom: ${(props) => props.active && "4px solid #007bff"};
  font-size: 1rem;
  background-color: ${(props) =>
    props.active ? "#e7f1ff" : "#fff"}; // Active button background
  color: ${(props) =>
    props.active ? "#007bff" : "#000"}; // Active button text color
  cursor: pointer;
  &:hover {
    background-color: #e7f1ff; // Hover effect
  }
  @media (min-width: 550px) {
    height: 56px;
    flex-direction: row;
    gap: 10px;
  }
`;

const ButtonsContainer = ({ cheapestPrice }) => {
  const topFlightsActiveButton = useSelector(
    (state) => state.flightSearch.topFlightsActiveButton
  );

  const dispatch = useDispatch();

  // Access cheapestPrice and currency from Redux store
  const { currency } = useSelector((state) => state.flightSearch);

  const handleButtonClick = (type) => {
    dispatch(setTopFlightsActiveButton(type));
  };

  return (
    <div>
      <Container>
        <Button
          active={topFlightsActiveButton === "best"}
          onClick={() => handleButtonClick("best")}
        >
          Best
          <InfoIcon
            sx={{
              fontSize: 16,
              color: topFlightsActiveButton === "best" ? "#e7f1ff" : "#fff",
              backgroundColor: "#5f6368",
              borderRadius: "50%",
            }}
          />
        </Button>
        <Button
          active={topFlightsActiveButton === "cheapest"}
          onClick={() => handleButtonClick("cheapest")}
          className="cheapest-price-button"
        >
          <h5>Cheapest</h5>
          <span>
            <span>from</span>
            {currency} {cheapestPrice}
          </span>
          <div>
            <InfoIcon
              sx={{
                fontSize: 16,
                color:
                  topFlightsActiveButton === "cheapest" ? "#e7f1ff" : "#fff",
                backgroundColor: "#5f6368",
                borderRadius: "50%",
              }}
            />
            <p>NEW</p>
          </div>
        </Button>
      </Container>
    </div>
  );
};

export default ButtonsContainer;
