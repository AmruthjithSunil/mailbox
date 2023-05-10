import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";

export default function Root() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const location = useLocation();

  return (
    <>
      {!isAuth && location.pathname !== "/auth" && <Navigate to="/auth" />}
      <Navbar />
      <Outlet />
    </>
  );
}
