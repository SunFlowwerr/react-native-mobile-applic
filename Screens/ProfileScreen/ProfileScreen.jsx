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

export const ProfileScreen = ({ navigation }) => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isFocusedLogin, setIsFocusedLogin] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [changeLoginColor, setChangeLoginColor] = useState(false);
  const [changeEmailColor, setChangeEmailColor] = useState(false);
  const [changePasswordColor, setChangePasswordColor] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const handleFocus = (variant) => {
    switch (variant) {
      case "login":
        setIsFocusedLogin(true);
        break;
      case "email":
        setIsFocusedEmail(true);
        break;
      case "password":
        setIsFocusedPassword(true);
        break;
      default:
        break;
    }
  };

  const toggleVisibility = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };

  const handleBlur = (variant) => {
    switch (variant) {
      case "login":
        setIsFocusedLogin(false);
        break;
      case "email":
        setIsFocusedEmail(false);
        break;
      case "password":
        setIsFocusedPassword(false);
        break;
      default:
        break;
    }
  };

  const changeColor = (variant) => {
    switch (variant) {
      case "login":
        setChangeLoginColor(true);
        break;
      case "email":
        setChangeEmailColor(true);
        break;
      case "password":
        setChangePasswordColor(true);
        break;
      default:
        break;
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    if (
      login !== "" &&
      email !== "" &&
      password !== "" &&
      isValidEmail(email)
    ) {
      console.log(login, email, password);
      reset();
    }

    reset();
  };

  const reset = () => {
    setLogin("");
    setEmail("");
    setPassword("");
  };

  const handleKeyboardShow = () => {
    setKeyboardVisible(true);
  };

  const handleKeyboardHide = () => {
    setKeyboardVisible(false);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      handleKeyboardShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      handleKeyboardHide
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
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
    justifyContent: "center",
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
    width: 132,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  addBtn: {
    position: "absolute",
    bottom: 14,
    justifyContent: "center",
    alignItems: "center",
    left: 119.5,
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
  title: {
    padding: 0,
    margin: 0,
    marginTop: 92,
    fontSize: 30,
    fontWeight: 500,
  },
  inputContainer: {
    display: "flex",
    gap: 16,
    marginTop: 0,
    width: 343,
  },
  input: {
    height: 50,
    padding: 16,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderRadius: 5,
    backgroundColor: "#F6F6F6",
    color: "#E8E8E8",
    fontSize: 16,
  },
  focusInput: {
    backgroundColor: "#fff",
    borderColor: "#FF6C00",
    color: "#212121",
  },
  changeInput: {
    color: "#212121",
  },
  passwordContainer: {
    position: "relative",
    width: 343,
  },
  showPasswordButton: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    paddingRight: 16,
  },

  btnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 16,
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
    width: 343,
    height: 51,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  logIn: {
    margin: 0,
    color: "#1B4371",
    fontSize: 16,
  },
});
