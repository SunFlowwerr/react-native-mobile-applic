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

export const CreatePostsScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [isFocusedTitle, setIsFocusedTitle] = useState(false);
  const [isFocusedPlace, setIsFocusedPlace] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isFieldsEmpty, setIsFieldsEmpty] = useState(true);

  useEffect(() => {
    if (isFieldsEmpty === false) {
      navigation.navigate("PostsScreen");
    }
  }, [isFieldsEmpty]);

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
    if (title !== "" && place !== "") {
      setIsButtonActive(true);
    } else setIsButtonActive(false);
  };

  const handleSubmit = () => {
    if (title !== "" && place !== "" && isButtonActive) {
      reset();
      setIsButtonActive(false);
      setIsFieldsEmpty(false);
    }
  };

  const reset = () => {
    if (title !== "" || place !== "") setPlace("");
    setTitle("");
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
            <View style={styles.photoContainer}>
              <View style={styles.photoIconContainer}>
                <FontAwesome name="camera" size={24} color="#BDBDBD" />
              </View>
            </View>
            <Text style={styles.photoText}>Завантажте фото</Text>
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
            <TouchableOpacity style={styles.deleteBtn} onPress={() => reset()}>
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
  photoIconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    backgroundColor: "#FFFFFF",
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
    gap: 16,
    marginTop: 32,
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
