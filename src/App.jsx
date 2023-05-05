import { Provider } from "react-redux";
import Auth from "./pages/Auth";
import store from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <Auth />
    </Provider>
  );
}
