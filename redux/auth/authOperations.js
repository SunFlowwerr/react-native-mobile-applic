import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";

export const authSignUpUser =
  ({ email, password, login }) =>
  async (dispatch) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        login
      );
      const user = userCredential.user;

      dispatch(
        authSlice.actions.updateUserProfile({
          userId: user.uid,
          email: email,
          displayName: login,
        })
      );
    } catch (error) {
      console.log("Ошибка при регистрации:", error);
      throw error;
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        dispatch(
          authSlice.actions.updateUserProfile({
            userId: user.uid,
            email: email,
            displayName: user.login,
          })
        );
      }
    } catch (error) {
      console.log("Ошибка при входе:", error);
      throw error;
    }
  };

export const authStateChanged = () => async (dispatch) => {
  try {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          authSlice.actions.updateUserProfile({
            userId: user.uid,
            displayName: user.displayName,
          })
        );
        dispatch(
          authSlice.actions.authStateChange({
            stateChange: true,
          })
        );
      } else {
        dispatch(
          authSlice.actions.updateUserProfile({
            userId: null,
            displayName: null,
          })
        );
        dispatch(
          authSlice.actions.authStateChange({
            stateChange: false,
          })
        );
      }
    });
  } catch (error) {
    console.log("Ошибка в функции authStateChanged:", error);
  }
};

export const authSignOutUser = () => async (dispatch) => {
  try {
    await signOut(auth);

    dispatch(authSlice.actions.authSignOut());

    console.log(auth);
  } catch (error) {
    console.log("Ошибка в функции authSignOutUser:", error);
    throw error;
  }
};
