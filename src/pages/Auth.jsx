import { useRef, useState } from "react";
import { login, signUp } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store";
import { Frame, Input, Warning, warnings } from "../utils/Auth";
import { Navigate } from "react-router-dom";

export default function Auth() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const [emptyWarning, setEmptyWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  async function submitHandler(e) {
    e.preventDefault();
    setEmptyWarning(false);
    const cp = isSignUp ? confirmPassword.current.value : null;
    const warning = warnings(
      email.current.value,
      password.current.value,
      cp,
      isSignUp
    );
    if (warning !== "") {
      setEmptyWarning(warning);
      return;
    }

    setIsLoading(true);
    const arg = [email.current.value, password.current.value];
    const data = isSignUp ? await signUp(...arg) : await login(...arg);
    console.log(data);
    data && dispatch(userActions.updateIdToken(data.idToken));
    data && dispatch(userActions.updateIsAuth(true));
    setIsLoading(false);
  }

  return (
    <Frame>
      {}
      <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
      {isAuth && <Navigate to="/" />}
      <form onSubmit={submitHandler}>
        <Input type="email" placeholder="Email" ref={email} />
        <Input type="password" placeholder="Password" ref={password} />
        {isSignUp && (
          <Input
            type="password"
            placeholder="Confirm Password"
            ref={confirmPassword}
          />
        )}
        <Input type="submit" value={isSignUp ? "Sign Up" : "Login"} />
      </form>
      {emptyWarning && <Warning>{emptyWarning}</Warning>}
      {isLoading && <p style={{ margin: "0" }}>sending request...</p>}
      <p>
        Have an account?{" "}
        <button
          onClick={() => {
            setIsSignUp((isSignUp) => !isSignUp);
          }}
        >
          {isSignUp ? "Login" : "Sign Up"}
        </button>
      </p>
    </Frame>
  );
}
