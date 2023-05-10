import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ComposeMail from "../components/ComposeMail";
import { getTokens, getUser } from "../utils/firebase";
import { userActions } from "../store";
import { useEffect } from "react";

export default function Home() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  async function getEverything() {
    const tokens = await getTokens();
    dispatch(userActions.updateIdToken(tokens.id_token));
    const data = await getUser(tokens);
    dispatch(userActions.updateUser(data.users[0]));
  }

  useEffect(() => {
    isAuth && getEverything();
  }, [isAuth]);

  return (
    <>
      {!isAuth && <Navigate to="/auth" />}
      <h1>Welcome to your mailbox</h1>
      <ComposeMail />
    </>
  );
}
