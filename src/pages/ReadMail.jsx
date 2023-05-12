import { Link, useParams } from "react-router-dom";
import { getMail, putMail } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../store";
import { useEffect, useState } from "react";
import DisplayMail from "../components/DisplayMail";

export default function ReadMail({ isSend }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const receivedMails = useSelector((state) => state.mail.receivedMail);
  const sendMails = useSelector((state) => state.mail.sendMail);
  const [mail, setMail] = useState(null);

  async function updateMail(email) {
    const mail = await getMail(email, id, isSend);
    setMail({ ...mail, id });
  }

  useEffect(() => {
    if (!user) {
      return;
    }
    const mail = isSend
      ? sendMails.find((el) => el.id === id)
      : receivedMails.find((el) => el.id === id);
    if (!mail) {
      updateMail(user.email);
      return;
    }
    if (!isSend && mail.new) {
      putMail(user.email, id, { ...mail, new: false });
      dispatch(mailActions.setAReceivedMail(id));
    }
    setMail(mail);
  }, [user]);

  return (
    <div style={{ width: "1000px", margin: "auto" }}>
      <Link to={isSend ? "/sentmails" : "/inbox"}>
        <button>Back</button>
      </Link>
      {mail && <DisplayMail mail={mail} />}
    </div>
  );
}
