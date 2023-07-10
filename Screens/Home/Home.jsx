import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { PostsScreen } from "../PostsScreen";
import { CreatePostsScreen } from "../CreatePostsScreen";
import { ProfileScreen } from "../ProfileScreen";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Octicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export const Home = () => {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          if (route.name === "PostsScreen") {
            return <AntDesign name="appstore-o" size={24} color="#212121" />;
          } else if (route.name === "CreatePostsScreen") {
            return <AntDesign name="plus" size={24} color="#fff" />;
          } else if (route.name === "ProfileScreen") {
            return <Octicons name="person" size={24} color="#212121" />;
          }
        },
        tabBarLabel: "",
        tabBarStyle: {
          height: 65,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        },
      })}
    >
      <Tab.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={({ route }) => ({
          headerShown: false,
          // tabBarStyle: { flex: 1 },
          tabBarButton: () => (
            <TouchableOpacity
              style={styles.addPostBtn}
              onPress={() => navigation.navigate("CreatePosts")}
            >
              <AntDesign name="plus" size={24} color="#fff" />
            </TouchableOpacity>
          ),
          tabBarStyle: { display: "none" },
        })}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  addPostBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
});
