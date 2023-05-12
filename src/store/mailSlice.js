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
    setAReceivedMail(state, action) {
      state.receivedMail = state.receivedMail.map((mail) => {
        if (mail.id !== action.payload) {
          return mail;
        } else {
          return { ...mail, new: false };
        }
      });
    },
    deleteReceivedMail(state, action) {
      state.receivedMail = state.receivedMail.filter(
        (mail) => mail.id !== action.payload
      );
    },
    deleteSendMail(state, action) {
      state.sendMail = state.sendMail.filter(
        (mail) => mail.id !== action.payload
      );
    },
  },
});

export default mailSlice;
