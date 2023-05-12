import styled from "styled-components";

export const Frame = styled.div`
  margin: auto;
  max-width: 1000px;
  padding: auto;
  border: solid;
  border-radius: 8px;
`;

export const Input = styled.input`
  width: 993px;
  min-height: 32px;
`;

export const Button = styled.button`
  background: lightblue;
  width: 80px;
  height: 32px;
  margin: 8px;
  border-radius: 8px;
  &:hover {
    background: cyan;
  }
`;
