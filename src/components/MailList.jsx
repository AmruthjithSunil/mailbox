import { useNavigate } from "react-router-dom";
import { BlueCicle, Frame } from "../utils/Inbox";
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
    console.log("delete: ", mail.id);
    dispatch(mailActions.deleteReceivedMail(mail.id));
    deleteReceivedMail(user.email, mail.id);
  }

  return (
    <Frame>
      {mail.new && <BlueCicle />}
      <p style={{ margin: "auto 0" }} onClick={clickHandler}>
        <span style={{ fontWeight: "bold" }}>
          {mail.from.split("@")[0]} - {mail.subject}
        </span>{" "}
        - {mail.content}
      </p>
      <button style={{ margin: "auto 32px" }} onClick={deleteHandler}>
        Delete
      </button>
    </Frame>
  );
}
