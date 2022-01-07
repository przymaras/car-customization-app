import { configureStore } from "@reduxjs/toolkit";

import carSliceReducer from "./car-slice";
import uiSliceReducer from "./ui-slice";

const store = configureStore({
  reducer: { car: carSliceReducer, ui: uiSliceReducer },
});

export default store;
