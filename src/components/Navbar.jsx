import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userActions } from "../store";
import "../styles.css";
import Nav from "./Nav";

export default function Navbar() {
  const receivedMail = useSelector((state) => state.mail.receivedMail);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  function logoutHandler() {
    localStorage.setItem("refreshToken", "null");
    dispatch(userActions.logout());
  }

  return (
    <div
      style={{
        display: "flex",
        maxWidth: "1000px",
        margin: "auto",
        marginBottom: "64px",
      }}
    >
      <Nav to="/" content="Compose" />
      <Nav
        to="/inbox"
        content={receivedMail.reduce((acc, mail) => acc + mail.new, 0)}
      />
      <Nav to="/sentmails" content="Sent Mails" />
      <div style={{ margin: "auto" }} onClick={logoutHandler}>
        {user && <>{user.email}</>}
        <br />
        <Link to="/auth">
          <span className="inactive">Logout</span>
        </Link>
      </div>
    </div>
  );
}
