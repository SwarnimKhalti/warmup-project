import Main from "@/components/Main";
import { Provider } from "react-redux";
import store from "@/store";
export default function Home() {
  return (
    <>
      <Provider store={store}>
        <Main />
      </Provider>
    </>
  );
}
