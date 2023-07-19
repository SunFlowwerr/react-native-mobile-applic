import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";

export const PostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);
  console.log(route.params);
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Публікації</Text>
          <TouchableOpacity
            style={styles.logOutBtn}
            onPress={() => navigation.navigate("RegistrationScreen")}
          >
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
        {/* <ScrollView> */}
        <View style={styles.mainContainer}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}></View>
            <View style={styles.dataContainer}>
              <Text style={styles.username}>Username</Text>
              <Text style={styles.gmail}>Gmail</Text>
            </View>
          </View>
          <View style={styles.postsContainer}>
            <FlatList
              data={posts}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View>
                  <Image
                    style={styles.photoContainer}
                    source={{ uri: item.photo }}
                  />
                  <Text style={styles.photoDescription}>Photo description</Text>
                  <View style={styles.postInfo}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("CommentsScreen")}
                    >
                      <EvilIcons name="comment" size={30} color="#BDBDBD" />
                    </TouchableOpacity>
                    <FontAwesome5
                      name="map-marker-alt"
                      size={22}
                      color="#BDBDBD"
                      style={styles.mapIcon}
                    />
                  </View>
                </View>
              )}
            ></FlatList>

            {/* <View style={styles.post}>
                <View style={styles.photoContainer}></View>
                <Text style={styles.photoDescription}>Photo description</Text>
                <View style={styles.postInfo}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("CommentsScreen")}
                  >
                    <EvilIcons name="comment" size={30} color="#BDBDBD" />
                  </TouchableOpacity>
                  <FontAwesome5
                    name="map-marker-alt"
                    size={22}
                    color="#BDBDBD"
                    style={styles.mapIcon}
                  />
                </View>
              </View> */}
          </View>
        </View>
        {/* </ScrollView> */}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    width: "100%",
    paddingBottom: 0,
    marginBottom: 0,
  },
  header: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    margin: 0,
    padding: 0,
    marginTop: 35,
    height: 44,
    fontSize: 17,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#BDBDBD",
  },
  headerText: {
    fontSize: 17,
    fontWeight: 500,
  },
  logOutBtn: {
    position: "absolute",
    right: 30,
    width: 24,
    height: 24,
  },
  mainContainer: {
    marginTop: 32,
    display: "flex",
    flexDirection: "column",
    gap: 32,
  },
  avatarContainer: {
    paddingLeft: 16,
    display: "flex",
    flexDirection: "row",
    width: 171,
    gap: 8,
  },
  avatar: {
    position: "relative",
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "#BDBDBD",
  },
  dataContainer: {
    display: "flex",
    flexDirection: "column",
    height: 60,
    justifyContent: "center",
  },
  username: {
    fontSize: 13,
    fontWeight: 700,
  },
  gmail: {
    fontSize: 11,
    fontWeight: 400,
    color: "#212121",
  },
  postsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
    marginBottom: 43,
  },
  post: {},
  photoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 343,
    height: 240,
    marginBottom: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#BDBDBD",
    backgroundColor: "#BDBDBD",
    borderRadius: 8,
  },
  photoDescription: {
    display: "flex",
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 500,
  },
  postInfo: {
    display: "flex",
    flexDirection: "row",
    gap: 49,
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 31,
    height: 83,
  },
  addPostBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  plusIcon: {
    position: "relative",
    width: 13,
    height: 13,
  },
  vertical: {
    position: "absolute",
    top: 0,
    left: "50%",
    width: 1,
    height: 13,
    backgroundColor: "#FFFFFF",
    transform: [{ translateX: -0.5 }],
  },
  horizontal: {
    position: "absolute",
    top: "50%",
    left: 0,
    width: 13,
    height: 1,
    backgroundColor: "#FFFFFF",
    transform: [{ translateY: -0.5 }],
  },
});
