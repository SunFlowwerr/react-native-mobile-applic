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
} from "react-native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

export const ProfileScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState("");
  const [isPhotoDisplayed, setIsPhotoDisplayed] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const dispatch = useDispatch();

  const { displayName } = useSelector((state) => state.auth);

  const logOut = () => {
    navigation.navigate("RegistrationScreen");
    dispatch(authSignOutUser());
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();

    async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
    };
  });

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const createPhoto = async () => {
    if (isPhotoDisplayed === false) {
      const temp = await cameraRef.takePictureAsync();
      setIsPhotoDisplayed(true);
      setPhoto(temp.uri);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <ImageBackground
          source={require("../images/bgImg.jpg")}
          style={styles.bgImg}
        >
          <View style={[styles.container]}>
            <View style={styles.avatarContainer}>
              {/* <Camera style={styles.avatar} ref={setCameraRef}>
                <TouchableOpacity
                  style={styles.addBtn}
                  onPress={() => createPhoto}
                >
                  <View style={styles.plusIcon}>
                    <View style={styles.vertical} />
                    <View style={styles.horizontal} />
                  </View>
                </TouchableOpacity>
              </Camera> */}
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
    // justifyContent: "center",
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
  },
  avatar: {
    position: "relative",
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  addBtn: {
    position: "absolute",
    bottom: 14,
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
});
