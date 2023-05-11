import { Provider } from "react-redux";
import Auth from "./pages/Auth";
import store from "./store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Inbox from "./pages/Inbox";
import ReadMail from "./pages/ReadMail";
import SentMails from "./pages/SentMails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/auth", element: <Auth /> },
      { path: "/inbox", element: <Inbox /> },
      { path: "/inbox/:id", element: <ReadMail /> },
      { path: "/sentmails", element: <SentMails /> },
    ],
  },
]);

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
