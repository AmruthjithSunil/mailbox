import { useRef, useState } from "react";
import styled from "styled-components";
import { signUp } from "../firebase";
import { useDispatch } from "react-redux";
import { userActions } from "../store";

const Frame = styled.div`
  max-width: 300px;
  margin: auto;
  margin-top: 150px;
  text-align: center;
  border: solid 1px;
`;

const Input = styled.input`
  width: 250px;
  min-height: 32px;
  margin: 0 0 12px 0;
`;

const Warning = styled.p`
  margin: 0;
  color: red;
`;

export default function Auth() {
  const dispatch = useDispatch();

  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const [emptyWarning, setEmptyWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function warnings(email, password, confirmPassword) {
    let text = "";
    if (email === "") {
      text += "Email should not be empty. ";
    }
    if (password === "") {
      text += "Password should not be empty. ";
    }
    if (confirmPassword === "") {
      text += "Confirm Password should not be empty. ";
    }
    if (password !== confirmPassword) {
      text += "Password should match Confirm Password.";
    }
    return text;
  }

  async function submitHandler(e) {
    e.preventDefault();
    setEmptyWarning(false);
    const warning = warnings(
      email.current.value,
      password.current.value,
      confirmPassword.current.value
    );
    if (warning !== "") {
      setEmptyWarning(warning);
      return;
    }

    setIsLoading(true);
    const data = await signUp(email.current.value, password.current.value);
    console.log(data);
    data && dispatch(userActions.updateIdToken(data.idToken));
    setIsLoading(false);
  }

  return (
    <Frame>
      <h2>Sign Up</h2>
      <form onSubmit={submitHandler}>
        <Input type="email" placeholder="Email" ref={email} />
        <Input type="password" placeholder="Password" ref={password} />
        <Input
          type="password"
          placeholder="Confirm Password"
          ref={confirmPassword}
        />
        <Input type="submit" value="Sign Up" />
      </form>
      {emptyWarning && <Warning>{emptyWarning}</Warning>}
      {isLoading && <p style={{ margin: "0" }}>sending request...</p>}
      <p>
        Have an account? <a href="bla">Login</a>
      </p>
    </Frame>
  );
}
