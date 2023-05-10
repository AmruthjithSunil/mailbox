import styled from "styled-components";

export const Frame = styled.button`
  display: flex;
  width: 100%;
  height: 32px;
`;

export const BlueCicle = styled.div`
  width: 8px;
  height: 8px;
  background: blue;
  margin: auto 4px;
  border-radius: 50%;
`;

export function objToArr(obj) {
  return Object.keys(obj).map((key) => {
    return { id: key, ...obj[key] };
  });
}
