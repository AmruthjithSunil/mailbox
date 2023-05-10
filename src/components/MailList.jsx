import { useNavigate } from "react-router-dom";
import { BlueCicle, Delete, Frame } from "../utils/Inbox";
import { deleteReceivedMail } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../store";

export default function MailList({ mail }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  function clickHandler() {
    navigate(`/inbox/${mail.id}`);
  }

  function deleteHandler() {
    dispatch(mailActions.deleteReceivedMail(mail.id));
    deleteReceivedMail(user.email, mail.id);
  }

  return (
    <Frame>
      {mail.new ? <BlueCicle /> : <BlueCicle style={{ background: "grey" }} />}
      <p style={{ margin: "auto 0" }} onClick={clickHandler}>
        <span style={{ fontWeight: "bold" }}>
          {mail.from.split("@")[0]} - {mail.subject}
        </span>{" "}
        - {mail.content}
      </p>
      <Delete onClick={deleteHandler}>Delete</Delete>
    </Frame>
  );
}
