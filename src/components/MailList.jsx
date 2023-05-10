import { useNavigate } from "react-router-dom";
import { BlueCicle, Frame } from "../utils/Inbox";

export default function MailList({ mail }) {
  const navigate = useNavigate();

  function clickHandler(id) {
    return function () {
      navigate(`/inbox/${id}`);
    };
  }

  return (
    <Frame onClick={clickHandler(mail.id)}>
      {mail.new && <BlueCicle />}
      <p style={{ margin: "auto 0" }}>
        <span style={{ fontWeight: "bold" }}>
          {mail.from.split("@")[0]} - {mail.subject}
        </span>{" "}
        - {mail.content}
      </p>
    </Frame>
  );
}
