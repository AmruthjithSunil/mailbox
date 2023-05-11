import { useSelector } from "react-redux";
import MailList from "../components/MailList";

export default function Inbox({ isSend }) {
  const mails = isSend
    ? useSelector((state) => state.mail.sendMail)
    : useSelector((state) => state.mail.receivedMail);

  return (
    <div style={{ marginTop: "16px" }}>
      {mails.map((mail) => (
        <MailList key={mail.id} isSend={isSend} id={mail.id} mail={mail} />
      ))}
    </div>
  );
}
