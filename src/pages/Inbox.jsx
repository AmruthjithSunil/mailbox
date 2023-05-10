import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMails, getTokens, getUser } from "../utils/firebase";
import { mailActions, userActions } from "../store";
import { objToArr } from "../utils/Inbox";
import MailList from "../components/MailList";

export default function Inbox() {
  const user = useSelector((state) => state.user.user);
  const receivedMail = useSelector((state) => state.mail.receivedMail);
  const dispatch = useDispatch();

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
    // const send = {
    //   NUkMVlvhHgXl0Xz1b: { content: "good morning", subject: "Test Mail" },
    // };
  }

  async function getEverything() {
    const tokens = await getTokens();
    dispatch(userActions.updateIdToken(tokens.id_token));
    const data = await getUser(tokens);
    dispatch(userActions.updateUser(data.users[0]));
  }

  useEffect(() => {
    !user && getEverything();
  }, []);

  useEffect(() => {
    user && updateMails(user.email);
  }, [user]);

  return (
    <div style={{ marginTop: "16px" }}>
      <p style={{ fontWeight: "bold" }}>
        {receivedMail.reduce((acc, mail) => acc + mail.new, 0)} unread mails
      </p>
      {receivedMail.map((mail) => (
        <MailList key={mail.id} id={mail.id} mail={mail} />
      ))}
    </div>
  );
}
