import { createSlice } from "@reduxjs/toolkit";

const carInitialState = {
  configData: {},
  configDataIsAvailable: false,
  currentConfig: {},
  configChanged: false,
};

const carSlice = createSlice({
  name: "car",
  initialState: carInitialState,
  reducers: {
    replaceConfigData(state, action) {
      state.configData = action.payload; //redux toolkit does not manipulate state directly - it uses immer under the hood
      state.configDataIsAvailable = true;
    },
    replaceCurrentConfig(state, action) {
      state.currentConfig = action.payload;
    },
    modifyCurrentConfig(state, action) {
      state.configChanged = true;
      const newSelCfg = action.payload;
      state.currentConfig = {
        ...state.currentConfig,
        [newSelCfg.option]: newSelCfg.selected,
      };
    },
    deleteDisabledConfig(state, action) {
      delete state.currentConfig[action.payload];
    },
  },
});

export const carActions = carSlice.actions;

export default carSlice.reducer;
