import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
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
          nickname: currentUser.displayName,
        })
      );
    } catch (error) {
      console.log("error:", error);
      throw error;
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(authSlice.actions.updateUserProfile({ userId: user.uid }));
      console.log(credentials.user);
      return credentials.user;
    } catch (error) {
      throw error;
    }
  };

// const authStateChanged = async (onChange = () => {}) => {
//   onAuthStateChanged((user) => {
//     onChange(user);
//   });
// };

// const updateUserProfile = async (update) => {
//   const user = auth.currentUser;

//   // якщо такий користувач знайдений
//   if (user) {
//     // оновлюємо його профайл
//     try {
//       await updateProfile(user, update);
//     } catch (error) {
//       throw error;
//     }
//   }
// };
