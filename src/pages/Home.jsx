import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Home() {
  const isAuth = useSelector((state) => state.user.isAuth);

  return (
    <>
      {!isAuth && <Navigate to="/auth" />}
      <h1>Welcome to your mailbox</h1>
    </>
  );
}
