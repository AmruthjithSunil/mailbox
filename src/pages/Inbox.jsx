import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMails } from "../utils/firebase";
import { mailActions } from "../store";
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

  useEffect(() => {
    user && updateMails(user.email);
  }, [user]);

  return (
    <div style={{ marginTop: "16px" }}>
      {receivedMail.map((mail) => (
        <MailList key={mail.id} isSend={false} id={mail.id} mail={mail} />
      ))}
    </div>
  );
}
