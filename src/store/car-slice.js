import { createSlice } from "@reduxjs/toolkit";

const carInitialState = {
  carConfigData: {},
  carConfigIsAvailable: false,
  currentConfig: {},
};

const carSlice = createSlice({
  name: "car",
  initialState: carInitialState,
  reducers: {
    replaceCarConfig(state, action) {
      state.carConfigData = action.payload;
      state.carConfigIsAvailable = true;
    },
    modifyCurrentConfig(state, action) {},
  },
});

export const carActions = carSlice.actions;

export default carSlice.reducer;
