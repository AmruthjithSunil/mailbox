import { createSlice } from "@reduxjs/toolkit";

!localStorage.getItem("refreshToken") &&
  localStorage.setItem("refreshToken", "null");

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuth: localStorage.getItem("refreshToken") !== "null",
    idToken: "null",
    user: null,
  },
  reducers: {
    updateIdToken(state, action) {
      state.idToken = action.payload;
    },
    updateIsAuth(state, action) {
      state.isAuth = action.payload;
    },
    updateUser(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.isAuth = false;
      state.idToken = "null";
      state.user = null;
    },
  },
});

export default userSlice;
