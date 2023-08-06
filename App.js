import { StyleSheet } from "react-native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import React, { useState } from "react";
import { authStateChanged } from "./redux/auth/authOperations.js";

import { Main } from "./Screens/Main.js";

const MainStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <Main></Main>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
