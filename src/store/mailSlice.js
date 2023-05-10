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
      const mails = [...state["receivedMail"]];
      state.receivedMail = mails.map((mail) => {
        if (mail.id !== action.payload) {
          return mail;
        } else {
          return { ...mail, new: false };
        }
      });
    },
  },
});

export default mailSlice;
