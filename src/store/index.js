import { configureStore } from "@reduxjs/toolkit";

import configSliceReducer from "./config-slice";
import uiSliceReducer from "./ui-slice";

const store = configureStore({
  reducer: { config: configSliceReducer, ui: uiSliceReducer },
});

export default store;
