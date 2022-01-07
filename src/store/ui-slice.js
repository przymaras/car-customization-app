import { createSlice } from "@reduxjs/toolkit";

const uiInitialState = {
  notification: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: uiInitialState,
  reducers: {
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      }; //redux toolkit does not manipulate state directly - it uses immer under the hood
    },
    hideNotification(state) {
      state.notification = null;
    },
  },
});

export default uiSlice.reducer;

export const uiActions = uiSlice.actions;
