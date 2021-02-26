import { createSlice } from "@reduxjs/toolkit";

interface MiscState {
  timeLastProcessed: number
  running: boolean
  userSettings: {
    resourceDisplayToggle: boolean
  }
}

const initialState: MiscState = {
  timeLastProcessed: Date.now(),
  running: false,
  userSettings: {
    resourceDisplayToggle: true,
  },
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
    },
    toggleResourceDisplay: ({ userSettings }) => {
      console.log("setting to :", !userSettings.resourceDisplayToggle);    
      userSettings.resourceDisplayToggle = !userSettings.resourceDisplayToggle  
    },
  },
});

export const {
  tick,
  active,
  toggleResourceDisplay,
} = miscSlice.actions;
