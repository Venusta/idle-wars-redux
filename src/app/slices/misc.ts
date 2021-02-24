import { createSlice } from "@reduxjs/toolkit";

interface MiscState {
  timeLastProcessed: number
}

const initialState: MiscState = {
  timeLastProcessed: Date.now() // load from save
}

interface TickPayload {
  payload: {
    difference: number
    now: number
  }
}

export const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    tick: (misc: MiscState, { payload }: TickPayload) => {
      const { now } = payload
      const difference = now - misc.timeLastProcessed
      console.log(`diff: ${difference}`);
      console.log(`now: ${now}`);
      
      misc.timeLastProcessed = now;
    },
  },
});

export const {
  tick,
} = miscSlice.actions;
