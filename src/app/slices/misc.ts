/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  BuildingId, UnitId, UnitIdProductionType, UnitProductionBuildingIdType,
} from "../game/constants";

interface MiscState {
  timeLastProcessed: number
  running: boolean
  userSettings: {
    resourceDisplayToggle: boolean
  }
  forms: Forms
}

export interface RecruitFormUnitData {
  unitId: UnitIdProductionType;
  amount: number;
}

export type RecruitFormUnits = {
  [id in UnitIdProductionType]?: RecruitFormUnitData
};

export type RecruitFormBuilding = {
  [id in UnitProductionBuildingIdType]: RecruitFormUnits
};

export interface RecruitForms {
  id: RecruitFormBuilding
  all: UnitProductionBuildingIdType[];
}

interface Forms {
  recruit: RecruitForms
}

// export interface BuildingsNormalised {
//   id: Buildings,
//   all: BuildingIdType[]
// }

const initialState: MiscState = {
  timeLastProcessed: Date.now(),
  running: false,
  userSettings: {
    resourceDisplayToggle: true,
  },
  forms: {
    recruit: {
      id: {
        [BuildingId.Barracks]: {
          [UnitId.Archer]: {
            unitId: UnitId.Archer,
            amount: 1,
          },
          [UnitId.Swordsman]: {
            unitId: UnitId.Swordsman,
            amount: 1,
          },
        },
        [BuildingId.Stable]: {
          [UnitId.HeavyCavalry]: {
            unitId: UnitId.HeavyCavalry,
            amount: 2,
          },
        },
        [BuildingId.Workshop]: {
        },
      },
      all: [BuildingId.Barracks, BuildingId.Stable, BuildingId.Workshop],
    },
  },
};

interface TickPayload {
  difference: number
  now: number
}

interface UnitFormPayload {
  unitId: UnitIdProductionType
  buildingId: UnitProductionBuildingIdType
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
    setUnitFormData: (misc, { payload: { buildingId, unitId, amount } }: PayloadAction<UnitFormPayload>) => {
      if (amount === undefined) {
        delete misc.forms.recruit.id[buildingId][unitId];
      } else {
        misc.forms.recruit.id[buildingId][unitId] = {
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
