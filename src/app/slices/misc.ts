/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { UnitId } from "../game/constants";

interface MiscState {
  timeLastProcessed: number
  running: boolean
  userSettings: {
    resourceDisplayToggle: boolean
  }
  forms: {
    recruit: RecruitForm
  }
}

export type RecruitForm = {
  [id in UnitId]?: number | undefined
};

const initialState: MiscState = {
  timeLastProcessed: Date.now(),
  running: false,
  userSettings: {
    resourceDisplayToggle: true,
  },
  forms: {
    recruit: {
      [UnitId.Archer]: 2,
    },
  },
};

interface TickPayload {
  payload: {
    difference: number
    now: number
  }
}
interface UnitFormPayload {
  payload: {
    unitId: UnitId
    amount: number | undefined
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
      userSettings.resourceDisplayToggle = !userSettings.resourceDisplayToggle;
    },
    setUnitFormData: (misc, { payload: { unitId, amount } }: UnitFormPayload) => {
      if (amount === undefined) {
        delete misc.forms.recruit[unitId];
      } else {
        misc.forms.recruit[unitId] = amount;
      }
    },
  },
});

export const {
  tick,
  active,
  toggleResourceDisplay,
  setUnitFormData,
} = miscSlice.actions;
