import { createSlice } from "@reduxjs/toolkit";

interface MiscState {
  then: number
}

const initialState: MiscState = {
  then: Date.now() // load from save
}

export const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    // todo save current time in ms
    // check last time, calc the difference then add resources/progress timers and set a new time
    tick: (misc) => {
      const now = Date.now();
      const difference = now - misc.then
      console.log(`diff: ${difference}`);
      misc.then = now;
    },
  },
});

export const {
  tick,
} = miscSlice.actions;
