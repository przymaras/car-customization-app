import { createSlice } from "@reduxjs/toolkit";

const configInitialState = {
  configData: {},
  configDataIsAvailable: false,
  currentConfig: {},
  currentConfigChanged: false,
};

const configSlice = createSlice({
  name: "config",
  initialState: configInitialState,
  reducers: {
    replaceConfigData(state, action) {
      state.configData = action.payload; //redux toolkit does not manipulate state directly - it uses immer under the hood
      state.configDataIsAvailable = true;
    },
    replaceCurrentConfig(state, action) {
      state.currentConfig = action.payload;
      state.currentConfigChanged = false;
    },
    modifyCurrentConfig(state, action) {
      state.currentConfigChanged = true;
      const newSelCfg = action.payload;
      state.currentConfig = {
        ...state.currentConfig,
        [newSelCfg.option]: newSelCfg.selected,
      };
    },
    deleteDisabledConfig(state, action) {
      delete state.currentConfig[action.payload];
    },
    clearCurrentConfig(state) {
      state.currentConfigChanged = false;
      state.currentConfig = {};
    },
  },
});

export const configActions = configSlice.actions;

export default configSlice.reducer;
