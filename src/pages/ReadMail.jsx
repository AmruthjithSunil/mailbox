import { Link, useParams } from "react-router-dom";
import { getMail, getTokens, getUser, putMail } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { mailActions, userActions } from "../store";
import { useEffect, useState } from "react";

export default function ReadMail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const receivedMails = useSelector((state) => state.mail.receivedMail);
  const [mail, setMail] = useState(null);

  async function getEverything() {
    const tokens = await getTokens();
    dispatch(userActions.updateIdToken(tokens.id_token));
    const data = await getUser(tokens);
    dispatch(userActions.updateUser(data.users[0]));
  }

  async function updateMail(email) {
    const mail = await getMail(email, id);
    setMail({ ...mail, id });
  }

  async function aging(mail) {
    const data = await putMail(user.email, id, { ...mail, new: false });
    console.log(data);
  }

  useEffect(() => {
    !user && getEverything();
  }, []);

  useEffect(() => {
    if (user) {
      const mail = receivedMails.find((el) => el.id === id);
      if (!mail) {
        updateMail(user.email);
      } else {
        if (mail.new) {
          aging(mail);
          dispatch(mailActions.setAReceivedMail(id));
        }
        setMail(mail);
      }
    }
  }, [user]);

  return (
    <>
      <Link to="/inbox">
        <button>Back</button>
      </Link>
      {mail && (
        <div style={{ marginLeft: "16px" }}>
          <h3>From: {mail.from}</h3>
          <h4>Subject: {mail.subject}</h4>
          <p>Content: {mail.content}</p>
        </div>
      )}
    </>
  );
}
