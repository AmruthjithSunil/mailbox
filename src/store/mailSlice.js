import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
  name: "mail",
  initialState: {
    sendMail: [],
    receivedMail: [],
  },
  reducers: {
    updateSendMail(state, action) {
      state.sendMail = action.payload;
    },
    updateReceivedMail(state, action) {
      state.receivedMail = action.payload;
    },
    addSendMail(state, action) {
      state.sendMail = [action.payload, ...state.sendMail];
    },
  },
});

export default mailSlice;
