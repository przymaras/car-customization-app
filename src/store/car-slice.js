import { createSlice } from "@reduxjs/toolkit";

const carInitialState = {
  configData: {},
  configDataIsAvailable: false,
  currentConfig: {},
};

const carSlice = createSlice({
  name: "car",
  initialState: carInitialState,
  reducers: {
    replaceConfig(state, action) {
      state.configData = action.payload;
      state.configDataIsAvailable = true;
    },
    modifyCurrentConfig(state, action) {
      const newSelCfg = action.payload;
      state.currentConfig = {
        ...state.currentConfig,
        [newSelCfg.option]: newSelCfg.selected,
      };
    },
  },
});

export const carActions = carSlice.actions;

export default carSlice.reducer;
