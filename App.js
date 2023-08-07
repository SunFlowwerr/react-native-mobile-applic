import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import React from "react";
import { Main } from "./Screens/Main.js";

export default function App() {
  return (
    <Provider store={store}>
      <Main></Main>
    </Provider>
  );
}
