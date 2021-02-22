import { combineReducers } from "@reduxjs/toolkit";
import { queueSlice } from "./queue";
import { townSlice } from "./towns";
import { miscSlice } from "./misc";

export const reducer = combineReducers({
  towns: townSlice.reducer,
  queue: queueSlice.reducer,
  misc: miscSlice.reducer,
});
