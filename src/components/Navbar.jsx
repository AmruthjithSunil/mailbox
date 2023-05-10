import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { userActions } from "../store";
import "../styles.css";

const Nav = styled.div`
  margin: auto;
`;

export default function Navbar() {
  const location = useLocation();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  function logoutHandler() {
    localStorage.setItem("refreshToken", "null");
    dispatch(userActions.logout());
  }

  return (
    <div style={{ display: "flex" }}>
      <Nav>
        <Link to="/">
          <span className={location.pathname === "/" ? "active" : "inactive"}>
            Compose
          </span>
        </Link>
      </Nav>
      <Nav>
        <Link to="/inbox">
          <span
            className={location.pathname === "/inbox" ? "active" : "inactive"}
          >
            Inbox
          </span>
        </Link>
      </Nav>
      <Nav onClick={logoutHandler}>
        {user && <>{user.email}</>}
        <Link to="/auth">
          <span className="inactive">Logout</span>
        </Link>
      </Nav>
    </div>
  );
}
