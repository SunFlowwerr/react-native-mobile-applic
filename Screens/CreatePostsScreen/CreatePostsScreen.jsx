import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { store, db } from "../../firebase/config";
import { ref, uploadBytes } from "firebase/storage";
import { useSelector } from "react-redux";

export const CreatePostsScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [isFocusedTitle, setIsFocusedTitle] = useState(false);
  const [isFocusedPlace, setIsFocusedPlace] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isFieldsEmpty, setIsFieldsEmpty] = useState(true);

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState("");
  const [isPhotoDisplayed, setIsPhotoDisplayed] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const [location, setLocation] = useState(null);

  const { displayName, userId } = useSelector((state) => state.auth);

  const uploadPostsToServer = async (
    title,
    place,
    displayName,
    userId,
    photo
  ) => {
    try {
      const processedPhoto = await uploadPhotoToServer(photo);

      await db.collection("posts").add({
        photo: processedPhoto,
        title,
        place,
        displayName,
        userId,
      });

      console.log("Post uploaded successfully!");
    } catch (error) {
      console.error("Error uploading post:", error);
    }
  };

  const uploadPhotoToServer = async (photo) => {
    try {
      const response = await fetch(photo);
      const file = await response.blob();

      const uniquePostId = Date.now().toString();

      const storageRef = ref(store, `postImage/${uniquePostId}`);
      await uploadBytes(storageRef, file);

      console.log("Photo uploaded successfully!");
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);

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

  const deletePublication = () => {
    setIsPhotoDisplayed(false);
    setPhoto("");
    setTitle("");
    setPlace("");
    setIsButtonActive(false);
    setIsFieldsEmpty(false);
    setType(Camera.Constants.Type.back);
    setCameraRef(null);
  };

  const handleFocus = (variant) => {
    switch (variant) {
      case "title":
        setIsFocusedTitle(true);
        break;
      case "place":
        setIsFocusedPlace(true);
        break;
      default:
        break;
    }
  };

  const enableBtn = () => {
    if (title !== "" && place !== "" && isPhotoDisplayed) {
      setIsButtonActive(true);
    } else setIsButtonActive(false);
  };

  const handleSubmit = () => {
    if (title !== "" && place !== "" && photo !== "" && isButtonActive) {
      navigation.navigate("Home", {
        screen: "PostsScreen",
        params: { photo, title, place, location },
      });
      // uploadPhotoToServer(photo);
      console.log(title, place);
      uploadPostsToServer(title, place, displayName, userId, photo);
      reset();
      setIsButtonActive(false);
      setIsFieldsEmpty(false);
    }
  };

  const reset = () => {
    if (title !== "" || place !== "") setPlace("");
    setTitle("");
    setIsPhotoDisplayed(false);
    setPhoto("");
    setType(Camera.Constants.Type.back);
    setCameraRef(null);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Home", { screen: "PostsScreen" })
              }
            >
              <Ionicons
                name="ios-arrow-back-outline"
                size={24}
                color="black"
                style={styles.backBtn}
              />
            </TouchableOpacity>

            <Text style={styles.headerText}>Створити публікацію</Text>
          </View>
          <View style={styles.addPhotoContainer}>
            {photo ? (
              <ImageBackground
                source={{ uri: photo }}
                style={styles.photoContainer}
                type={type}
              >
                <TouchableOpacity
                  style={styles.photoIconContainer}
                  onPress={() => {
                    createPhoto();
                    setType(
                      type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                  }}
                >
                  <FontAwesome name="camera" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </ImageBackground>
            ) : (
              <Camera style={styles.photoContainer} ref={setCameraRef}>
                <TouchableOpacity
                  style={styles.photoIconContainer}
                  onPress={() => createPhoto()}
                >
                  <FontAwesome name="camera" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </Camera>
            )}
            {isPhotoDisplayed ? (
              <Text style={styles.photoText}>Редагувати фото</Text>
            ) : (
              <Text style={styles.photoText}>Завантажте фото</Text>
            )}
          </View>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.input,
                  isFocusedTitle ? styles.focusInput : null,
                ]}
                placeholder="Назва..."
                defaultValue={title}
                cursorColor={"#BDBDBD"}
                onFocus={() => handleFocus("title")}
                onChangeText={(newText) => setTitle(newText)}
                onBlur={() => enableBtn()}
              ></TextInput>
              <View style={styles.inputAddress}>
                <TextInput
                  style={[
                    styles.input,
                    isFocusedPlace ? styles.focusInput : null,
                    styles.address,
                  ]}
                  placeholder="Місцевість..."
                  defaultValue={place}
                  cursorColor={"#BDBDBD"}
                  onFocus={() => handleFocus("place")}
                  onChangeText={(newText) => setPlace(newText)}
                  onBlur={() => enableBtn()}
                ></TextInput>
                <FontAwesome5
                  name="map-marker-alt"
                  size={24}
                  color="#BDBDBD"
                  style={styles.mapIcon}
                />
              </View>
            </View>
            <TouchableOpacity
              style={[
                styles.postBtn,
                isButtonActive ? styles.enablePostBtn : null,
              ]}
              onPress={() => handleSubmit()}
            >
              <Text
                style={[
                  styles.btnText,
                  isButtonActive ? styles.enableBtnText : null,
                ]}
              >
                Опублікувати
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => deletePublication()}
            >
              <FontAwesome5 name="trash-alt" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    width: "100%",
    paddingBottom: 0,
    marginBottom: 0,
  },
  camera: { height: 300 },
  header: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    margin: 0,
    padding: 0,
    marginBottom: 32,
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
  backBtn: {
    position: "absolute",
    left: -80,
    top: -10,
    width: 24,
    height: 24,
  },
  addPhotoContainer: {
    display: "flex",
    alignItems: "center",
  },
  photoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 343,
    height: 240,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
  },
  backPhoto: {},
  photoIconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 100,
  },
  cameraIcon: {
    width: 24,
    height: 24,
  },
  photoText: {
    marginTop: 8,
    color: "#BDBDBD",
    fontSize: 16,
  },
  formContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
  },
  inputContainer: {
    display: "flex",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    marginTop: 32,
    marginBottom: 32,
  },
  inputAddress: {
    position: "relative",
    width: 343,
    height: 50,
  },
  address: {
    paddingLeft: 28,
  },
  input: {
    display: "flex",
    width: 343,
    height: 50,
    fontSize: 16,
    color: "#BDBDBD",
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#BDBDBD",
  },
  mapIcon: {
    position: "absolute",
    bottom: 13,
  },
  focusInput: {
    color: "#212121",
  },
  postBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
    width: 343,
    height: 51,
    marginBottom: 60,
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
  },
  btnText: {
    fontSize: 16,
    color: "#BDBDBD",
  },
  enablePostBtn: {
    backgroundColor: "#FF6C00",
  },
  enableBtnText: {
    color: "white",
    fontSize: 16,
  },
  deleteBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
  },
  trashIcon: {
    backgroundColor: "#F6F6F6",
  },
});
