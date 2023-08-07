import { createSlice } from "@reduxjs/toolkit";

const state = {
  userId: null,
  displayName: null,
  stateChange: false,
  email: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    updateUserProfile(state, action) {
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
    },
    authStateChange(state, action) {
      state.stateChange = action.payload.stateChange;
    },
    authSignOut(state, action) {
      state.userId = null;
      state.email = null;
      state.displayName = null;
      state.stateChange = false;
    },
  },
});

// export const authSlice = createSlice({
//   name: "auth",
//   initialState: state,
//   reducers: {
//     updateUserProfile(state, action) {
//       state.userId = action.payload.userId;
//       state.email = action.payload.email;
//       state.displayName = action.payload.displayName;
//     },
//     authStateChange: (state, { payload }) => ({
//       ...state,
//       stateChange: payload.stateChange,
//     }),
//     authSignOut: () => state,
//   },
// });
