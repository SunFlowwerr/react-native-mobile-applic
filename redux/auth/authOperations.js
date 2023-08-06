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
  async (dispatch, getState) => {
    console.log(email, password);
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);

      const currentUser = auth.currentUser;

      await updateProfile(currentUser, {
        displayName: login,
      });

      console.log(currentUser.displayName);

      dispatch(
        authSlice.actions.updateUserProfile({
          userId: currentUser.uid,
          email: email,
          displayName: login,
        })
      );
    } catch (error) {
      console.log("error:", error);
      throw error;
    }
  };

export const authSignInUser =
  ({ email, password, login }) =>
  async (dispatch, getState) => {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      dispatch(
        authSlice.actions.updateUserProfile({
          userId: user.uid,
          email: email,
          displayName: login,
        })
      );
      console.log(credentials.user);
      return credentials.user;
    } catch (error) {
      throw error;
    }
  };

export const authStateChanged = () => async (dispatch, getState) => {
  try {
    const user = await new Promise((resolve, reject) => {
      onAuthStateChanged(
        auth,
        (user) => {
          resolve(user);
        },
        (error) => {
          reject(error);
        }
      );
    });

    if (user) {
      dispatch(
        authSlice.actions.updateUserProfile({
          userId: user.uid,
          nickname: user.displayName,
        })
      );
      dispatch(
        authSlice.actions.authStateChange({
          stateChange: true,
        })
      );
    }
  } catch (error) {
    console.log("Error in authStateChanged:", error);
  }
};

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    await signOut(auth);
    dispatch(
      authSlice.actions.updateUserProfile({
        userId: null,
        email: null,
        displayName: null,
      })
    );
    dispatch(
      authSlice.actions.authStateChange({
        stateChange: false,
      })
    );
  } catch (error) {
    throw error;
  }
};
