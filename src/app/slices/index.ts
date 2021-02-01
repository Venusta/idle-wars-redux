import { combineReducers } from "@reduxjs/toolkit";
import { queueSlice } from "./queue";
import { townSlice } from "./towns";

export const reducer = combineReducers({
  towns: townSlice.reducer,
  queue: queueSlice.reducer,
});
