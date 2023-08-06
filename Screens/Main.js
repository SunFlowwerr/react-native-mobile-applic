import { StyleSheet } from "react-native";
import { RegistrationScreen } from "./RegistrationScreen";
import { LoginScreen } from "./LoginScreen";
import { CommentsScreen } from "./CommentsScreen/CommentsScreen";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "./Home";
import { MapScreen } from "./MapScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authStateChanged } from "../redux/auth/authOperations";

const MainStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

export const Main = () => {
  const { email, displayName } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log(email, displayName);

  useEffect(() => {
    dispatch(authStateChanged());
  }, []);

  return (
    <NavigationContainer
      style={[styles.container, { backgroundColor: "white" }]}
    >
      {email !== null && displayName !== null ? (
        <MainStack.Navigator initialRouteName="Home">
          <MainStack.Screen
            name="RegistrationScreen"
            component={RegistrationScreen}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="CommentsScreen"
            component={CommentsScreen}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="MapScreen"
            component={MapScreen}
            options={{ headerShown: false }}
          />
        </MainStack.Navigator>
      ) : (
        <MainStack.Navigator initialRouteName="RegistrationScreen">
          <MainStack.Screen
            name="RegistrationScreen"
            component={RegistrationScreen}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="CommentsScreen"
            component={CommentsScreen}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="MapScreen"
            component={MapScreen}
            options={{ headerShown: false }}
          />
        </MainStack.Navigator>
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
