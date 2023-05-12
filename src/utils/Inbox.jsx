import styled from "styled-components";

export const Frame = styled.button`
  display: flex;
  width: 800px;
  height: 32px;
  background: lightgrey;
  margin: auto;
  padding-left: 40px;
  &:hover {
    background: lightblue;
  }
`;

export const BlueCicle = styled.div`
  width: 8px;
  height: 8px;
  background: blue;
  margin: auto 4px;
  border-radius: 50%;
`;

export const Delete = styled.div`
  margin: auto 32px;
  border: solid 1px;
  padding: 2px 4px;
  border-radius: 4px;
  background: lightsalmon;
  margin-left: auto;
  &:hover {
    background: lightcoral;
  }
`;

export function objToArr(obj) {
  return Object.keys(obj).map((key) => {
    return { id: key, ...obj[key] };
  });
}
// const send = {
//   NUkMVlvhHgXl0Xz1b: { content: "good morning", subject: "Test Mail" },
// };
