import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getTokens, getUser } from "../utils/firebase";
import { userActions } from "../store";
import { useEffect } from "react";

export default function Root() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const location = useLocation();

  async function getEverything() {
    const tokens = await getTokens();
    dispatch(userActions.updateIdToken(tokens.id_token));
    const data = await getUser(tokens);
    dispatch(userActions.updateUser(data.users[0]));
  }

  useEffect(() => {
    isAuth && !user && getEverything();
  }, []);

  return (
    <>
      {!isAuth && location.pathname !== "/auth" && <Navigate to="/auth" />}
      <Navbar />
      <Outlet />
    </>
  );
}
