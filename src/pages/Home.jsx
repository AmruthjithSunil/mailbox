import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ComposeMail from "../components/ComposeMail";
import { getMails, getTokens, getUser } from "../utils/firebase";
import { mailActions, userActions } from "../store";
import { useEffect } from "react";

export default function Home() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  async function getEverything() {
    const tokens = await getTokens();
    dispatch(userActions.updateIdToken(tokens.id_token));
    const data = await getUser(tokens);
    dispatch(userActions.updateUser(data.users[0]));
    const mails = await getMails(data.users[0].email);
    console.log(mails);
    // if(mails.send){
    //   dispatch(mailActions.updateSendMail(mails.send))
    // }
    // if(mails.received){
    //   dispatch(mailActions.updateReceivedMail(mails.received))
    // }
    // const send = {NUkMVlvhHgXl0Xz1b:  { content: "good morning", subject: "Test Mail" }}
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
