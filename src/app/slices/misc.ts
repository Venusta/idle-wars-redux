/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  [id in UnitId]?: [UnitId, number]
};

const initialState: MiscState = {
  timeLastProcessed: Date.now(),
  running: false,
  userSettings: {
    resourceDisplayToggle: true,
  },
  forms: {
    recruit: {
      [UnitId.Archer]: [UnitId.Archer, 2],
    },
  },
};

interface TickPayload {
  difference: number
  now: number
}
interface UnitFormPayload {
  unitId: UnitId
  amount: number | undefined
}

export const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {

    // * leave this as an example
    tick2: {
      reducer(state, { payload: { now } }: PayloadAction<TickPayload>) {
        state.timeLastProcessed = now;
      },
      prepare(now: number, difference: number) {
        return {
          payload: { now, difference },
        };
      },
    },
    tick: (misc, { payload }: PayloadAction<TickPayload>) => {
      misc.timeLastProcessed = payload.now;
    },
    active: (misc) => {
      misc.running = true;
    },
    toggleResourceDisplay: ({ userSettings }) => {
      console.log("setting to :", !userSettings.resourceDisplayToggle);
      userSettings.resourceDisplayToggle = !userSettings.resourceDisplayToggle;
    },
    setUnitFormData: (misc, { payload: { unitId, amount } }: PayloadAction<UnitFormPayload>) => {
      if (amount === undefined) {
        delete misc.forms.recruit[unitId];
      } else {
        misc.forms.recruit[unitId] = [unitId, amount];
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
