import { Provider } from "react-redux";
import Auth from "./pages/Auth";
import store from "./store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Inbox from "./pages/Inbox";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/auth", element: <Auth /> },
      { path: "/inbox", element: <Inbox /> },
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
