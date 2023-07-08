import React from "react";
import { StyleSheet, View } from "react-native";
import { RegistrationScreen } from "./Screens/RegistrationScreen/RegistrationScreen.jsx";
import { LoginScreen } from "./Screens/LoginScreen";
import { CreatePostsScreen } from "./Screens/CreatePostsScreen";
import { CommentsScreen } from "./Screens/CommentsScreen/CommentsScreen.jsx";
// import "react-native-gesture-handler";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const MainStack = createStackNavigator();

export default function App() {
  return (
    // <View style={styles.container}>
    //   <RegistrationScreen />
    //   {/* <LoginScreen /> */}
    //   {/* <CreatePostsScreen></CreatePostsScreen> */}
    //   {/* <CommentsScreen></CommentsScreen> */}
    // </View>
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="RegistrationScreen">
        <MainStack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
        />
        <MainStack.Screen name="LoginScreen" component={LoginScreen} />
        {/* <MainStack.Screen name="Home" component={Home} /> */}
      </MainStack.Navigator>
    </NavigationContainer>
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
