import { Provider } from "react-redux";
import Auth from "./pages/Auth";
import store from "./store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Inbox from "./pages/Inbox";
import ReadMail from "./pages/ReadMail";
import SentMails from "./pages/SentMails";
import ComposeMail from "./pages/ComposeMail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <ComposeMail /> },
      { path: "/auth", element: <Auth /> },
      { path: "/inbox", element: <Inbox /> },
      { path: "/inbox/:id", element: <ReadMail isSend={false} /> },
      { path: "/sentmails", element: <SentMails /> },
      { path: "/sentmails/:id", element: <ReadMail isSend={true} /> },
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
