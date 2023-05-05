import styled from "styled-components";

export const Frame = styled.div`
  max-width: 300px;
  margin: auto;
  margin-top: 150px;
  text-align: center;
  border: solid 1px;
`;

export const Input = styled.input`
  width: 250px;
  min-height: 32px;
  margin: 0 0 12px 0;
`;

export const Warning = styled.p`
  margin: 0;
  color: red;
`;

export function warnings(email, password, confirmPassword, isSignUp) {
  let text = "";
  if (email === "") {
    text += "Email should not be empty. ";
  }
  if (password === "") {
    text += "Password should not be empty. ";
  }
  if (!isSignUp) {
    return text;
  }
  if (confirmPassword === "") {
    text += "Confirm Password should not be empty. ";
  }
  if (password !== confirmPassword) {
    text += "Password should match Confirm Password.";
  }
  return text;
}
