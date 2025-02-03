// Input.js
import React from "react";
import styled from "styled-components";

// Define a styled input element
const StyledInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid
    ${(props) => (props.error ? "red" : "var(--color-cerebral-grey)")};
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  &:focus {
    border-color: ${(props) =>
      props.error ? "red" : "var(--color-olympic-blue)"};
  }
`;

// Define a wrapper for the input to add label and optional error message
const InputWrapper = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: ${(props) => (props.error ? "red" : "var(--color-carbon)")};
`;

const ErrorMessage = styled.span`
  font-size: 12px;
  color: red;
  margin-top: 5px;
  display: block;
`;

const Input = ({ label, value, onChange, placeholder, error, ...rest }) => {
  return (
    <InputWrapper>
      {label && <Label error={error}>{label}</Label>}
      <StyledInput
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        error={error}
        {...rest}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputWrapper>
  );
};

export default Input;
