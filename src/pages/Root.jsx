import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getMails, getTokens, getUser } from "../utils/firebase";
import { mailActions, userActions } from "../store";
import { useEffect } from "react";
import { objToArr } from "../utils/Inbox";

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

  async function updateMails(email) {
    const mails = await getMails(email);
    if (!mails) {
      dispatch(mailActions.updateSendMail([]));
      dispatch(mailActions.updateReceivedMail([]));
      return;
    }
    if (mails.send) {
      dispatch(mailActions.updateSendMail(objToArr(mails.send)));
    }
    if (mails.received) {
      dispatch(mailActions.updateReceivedMail(objToArr(mails.received)));
    }
  }

  useEffect(() => {
    user && updateMails(user.email);
  }, [user]);

  return (
    <>
      {!isAuth && location.pathname !== "/auth" && <Navigate to="/auth" />}
      <Navbar />
      <Outlet />
    </>
  );
}
