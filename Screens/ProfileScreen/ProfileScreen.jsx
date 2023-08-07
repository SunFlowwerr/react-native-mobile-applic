import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  Image,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { db } from "../../firebase/config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
// import { Camera } from "expo-camera";
// import * as MediaLibrary from "expo-media-library";

export const ProfileScreen = ({ navigation }) => {
  // const [hasPermission, setHasPermission] = useState(null);
  // const [cameraRef, setCameraRef] = useState(null);
  // const [photo, setPhoto] = useState("");
  // const [isPhotoDisplayed, setIsPhotoDisplayed] = useState(false);
  // const [type, setType] = useState(Camera.Constants.Type.back);
  const dispatch = useDispatch();

  const [posts, setPosts] = useState([]);
  //const location = route.params?.location;

  const { displayName } = useSelector((state) => state.auth);

  const getAllPosts = async () => {
    const docRef = collection(db, "posts");
    const docSnap = await getDocs(docRef);
    const postsList = docSnap.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setPosts(postsList);

    console.log(postsList);
  };

  const logOut = () => {
    navigation.navigate("RegistrationScreen");
    dispatch(authSignOutUser());
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <ImageBackground
          source={require("../images/bgImg.jpg")}
          style={styles.bgImg}
        >
          <View style={[styles.container]}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <TouchableOpacity style={styles.addBtn}>
                  <View style={styles.plusIcon}>
                    <View style={styles.vertical} />
                    <View style={styles.horizontal} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.logOutBtn} onPress={() => logOut()}>
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
            <Text style={styles.title}>{displayName}</Text>
            <FlatList
              nestedScrollEnabled={true}
              style={styles.postsList}
              data={posts}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.cont}>
                  <Image
                    style={styles.photoContainer}
                    source={{ uri: item.photo }}
                  />
                  <Text style={styles.photoDescription}>{item.title}</Text>
                  <View style={styles.postInfo}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("CommentsScreen", {
                          postId: item.id,
                        })
                      }
                    >
                      <EvilIcons name="comment" size={30} color="#BDBDBD" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("MapScreen", {
                          location: location,
                        })
                      }
                    >
                      <View style={styles.mapContainer}>
                        <FontAwesome5
                          name="map-marker-alt"
                          size={22}
                          color="#BDBDBD"
                          style={styles.mapIcon}
                        />
                        <Text style={styles.photoLocation}>{item.place}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    paddingBottom: 0,
  },
  logOutBtn: {
    position: "absolute",
    top: 22,
    right: 30,
    width: 24,
    height: 24,
  },
  title: {
    padding: 0,
    margin: 0,
    marginTop: 92,
    fontSize: 30,
    fontWeight: 500,
  },
  bgImg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  container: {
    position: "relative",
    bottom: 0,
    display: "flex",
    alignItems: "center",
    gap: 43,
    width: "100%",
    height: 549,
    marginBottom: 0,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avatarContainer: {
    position: "absolute",
    top: "-11%",
    height: "50%",
    borderRadius: 16,
    width: 120,
    height: 120,
  },
  avatar: {
    position: "relative",
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    flex: 1,
    borderRadius: 16,
  },
  addBtn: {
    position: "absolute",
    bottom: 20,
    justifyContent: "center",
    alignItems: "center",
    // left: 119.5,
    left: 108,
    width: 25,
    height: 25,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#FF6C00",
    borderRadius: 12.5,
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
    backgroundColor: "#FF6C00",
    transform: [{ translateX: -0.5 }],
  },
  horizontal: {
    position: "absolute",
    top: "50%",
    left: 0,
    width: 13,
    height: 1,
    backgroundColor: "#FF6C00",
    transform: [{ translateY: -0.5 }],
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
    // borderStyle: "solid",
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
  mapContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  photoLocation: {
    display: "flex",
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 400,
  },
  postsList: {
    display: "flex",
    gap: 32,
    flexGrow: 1,
  },
});
