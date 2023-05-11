import { Link, useLocation } from "react-router-dom";
import "../styles.css";

export default function Nav({ to, content }) {
  const location = useLocation();

  return (
    <div style={{ margin: "auto" }}>
      <Link to={to}>
        <span className={location.pathname === to ? "active" : "inactive"}>
          {to === "/inbox" && "Inbox("}
          {content}
          {to === "/inbox" && ")"}
        </span>
      </Link>
    </div>
  );
}
