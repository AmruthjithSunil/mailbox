import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Inbox() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const receivedMail = useSelector((state) => state.mail.receivedMail);

  return (
    <>
      {!isAuth && <Navigate to="/auth" />}
      <button>Reload</button>
      {receivedMail.map((mail) => (
        <div key={mail.id} id={mail.id}>
          {mail.subject} - {mail.content}
        </div>
      ))}
    </>
  );
}
