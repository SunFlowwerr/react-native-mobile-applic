import { StyleSheet, View } from "react-native";
import { RegistrationScreen } from "./Screens/RegistrationScreen/RegistrationScreen.jsx";
import { LoginScreen } from "./Screens/LoginScreen";
import { CreatePostsScreen } from "./Screens/CreatePostsScreen/index.js";
import { CommentsScreen } from "./Screens/CommentsScreen/CommentsScreen.jsx";
import { PostsScreen } from "./Screens/PostsScreen";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "./Screens/Home";
import { MapScreen } from "./Screens/MapScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import React, { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRoute } from "@react-navigation/native";

const MainStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const authStateChanged = async (onChange = () => {}) => {
    onAuthStateChanged((user) => {
      onChange(user);
      setUser(user);
    });
  };

  // const routing = useRoute(user);
  return (
    <Provider store={store}>
      <NavigationContainer
        style={[styles.container, { backgroundColor: "white" }]}
      >
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
      </NavigationContainer>
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
