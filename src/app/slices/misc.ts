/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  UnitId, UnitIdProductionArray, UnitIdProductionType,
} from "../game/constants";

interface MiscState {
  timeLastProcessed: number
  running: boolean
  userSettings: {
    resourceDisplayToggle: boolean
  }
  forms: FormsRecruit
}

export interface FormsRecruitUnitData {
  unitId: UnitIdProductionType
  amount: number
}

export type FormsRecruitUnit = Record<UnitIdProductionType, FormsRecruitUnitData>;

export interface FormsRecruitUnits {
  id: Partial<FormsRecruitUnit>
  all: readonly UnitIdProductionType[]
}

interface FormsRecruit {
  recruit: {
    units: FormsRecruitUnits
  }
}

const initialState: MiscState = {
  timeLastProcessed: Date.now(),
  running: false,
  userSettings: {
    resourceDisplayToggle: true,
  },
  forms: {
    recruit: {
      units: {
        id: {
          // [UnitId.Archer]: {
          //   id: UnitId.Archer,
          //   amount: 0,
          // },
          [UnitId.Swordsman]: {
            unitId: UnitId.Swordsman,
            amount: 1,
          },
          // [UnitId.SpearFighter]: {
          //   id: UnitId.SpearFighter,
          //   amount: 0,
          // },
          [UnitId.HeavyCavalry]: {
            unitId: UnitId.HeavyCavalry,
            amount: 1,
          },
          [UnitId.Scout]: {
            unitId: UnitId.Scout,
            amount: 1,
          },
          // [UnitId.Axeman]: {
          //   id: UnitId.Axeman,
          //   amount: 0,
          // },
          [UnitId.LightCavalry]: {
            unitId: UnitId.LightCavalry,
            amount: 1,
          },
          [UnitId.Ram]: {
            unitId: UnitId.Ram,
            amount: 1,
          },
          [UnitId.Catapult]: {
            unitId: UnitId.Catapult,
            amount: 1,
          },
          [UnitId.MountedArcher]: {
            unitId: UnitId.MountedArcher,
            amount: 1,
          },
        },
        all: UnitIdProductionArray,
      },
    },
  },
};

interface TickPayload {
  difference: number
  now: number
}

interface UnitFormPayload {
  unitId: UnitIdProductionType
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
        delete misc.forms.recruit.units.id[unitId];
      } else {
        misc.forms.recruit.units.id[unitId] = {
          unitId,
          amount,
        };
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
