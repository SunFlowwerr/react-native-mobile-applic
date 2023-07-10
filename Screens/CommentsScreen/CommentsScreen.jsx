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
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export const CommentsScreen = ({ navigation }) => {
  const [message, setMessage] = useState("");
  const [text, setText] = useState("");

  const [comments, setComments] = useState([]);

  const createComment = () => {
    if (message !== "") {
      const newComment = { id: comments.length + 1, text: message };
      setComments([...comments, newComment]);
      setMessage("");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
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
          <Text style={styles.headerText}>Коментарі</Text>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.addPhotoContainer}>
            <View style={styles.photoContainer}>
              <View style={styles.photoIconContainer}>
                <Image
                  source={require("../images/camera.jpg")}
                  style={styles.cameraIcon}
                ></Image>
              </View>
            </View>
          </View>
          <View>
            {comments.map((comment) => (
              <View key={comment.id} style={styles.messageBoxContainer}>
                <Text>{comment.text}</Text>
              </View>
            ))}
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.messageContainer}>
              <TextInput
                onChangeText={(newText) => setMessage(newText)}
                placeholder="Коментувати..."
                defaultValue={message}
                cursorColor={"#212121"}
                style={styles.input}
              />
              <TouchableOpacity
                style={styles.sendMessageBtn}
                onPress={() => createComment()}
              ></TouchableOpacity>
            </View>
          </View>
        </View>
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
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    gap: 58,
    margin: 0,
    padding: 0,
    marginBottom: 32,
    marginTop: 30,
    paddingLeft: 25,
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
    width: 24,
    height: 24,
  },
  mainContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  messageBoxContainer: {
    width: 299,
    minHeight: 70,
    backgroundColor: "#F6F6F6",
  },
  inputContainer: {
    position: "absolute",
    bottom: -400,
  },
  input: {
    width: 343,
    height: 50,
    padding: 16,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
    color: "#E8E8E8",
    fontSize: 16,
  },
  sendMessageBtn: {
    width: 34,
    height: 34,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    position: "absolute",
    top: 8,
    right: 8,
    bottom: 8,
    justifyContent: "center",
  },
  messageContainer: {
    position: "relative",
    width: 343,
  },
});
