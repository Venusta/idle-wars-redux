import { combineReducers } from "@reduxjs/toolkit";
import { townSlice } from "./towns";

export const reducer = combineReducers({
  towns: townSlice.reducer,
});
