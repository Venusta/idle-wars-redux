import { createSlice } from "@reduxjs/toolkit";

interface MiscState {
  timeLastProcessed: number
  running: boolean
}

const initialState: MiscState = {
  timeLastProcessed: Date.now(),
  running: false,
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
      misc.timeLastProcessed = payload.now;
    },
    active: (misc) => {
      misc.running = true;
    }
  },
});

export const {
  tick,
  active,
} = miscSlice.actions;
