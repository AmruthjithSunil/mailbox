import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import mailSlice from "./mailSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    mail: mailSlice.reducer,
  },
});

export const userActions = userSlice.actions;
export const mailActions = mailSlice.actions;

export default store;
