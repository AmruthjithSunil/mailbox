import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { userActions } from "../store";

const Nav = styled.div`
  margin: auto;
`;

export default function Navbar() {
  const dispatch = useDispatch();

  function logoutHandler() {
    localStorage.setItem("refreshToken", "null");
    dispatch(userActions.logout());
  }

  return (
    <div style={{ display: "flex" }}>
      <Nav>
        <Link to="/">Compose</Link>
      </Nav>
      <Nav>
        <Link to="/inbox">Inbox</Link>
      </Nav>
      <Nav onClick={logoutHandler}>
        <Link to="/auth">Logout</Link>
      </Nav>
    </div>
  );
}
