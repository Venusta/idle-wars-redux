import { combineReducers } from "@reduxjs/toolkit";
import { townSlice } from "./newTowns";
import { miscSlice } from "./misc";

export const reducer = combineReducers({
  towns: townSlice.reducer,
  misc: miscSlice.reducer,
});
