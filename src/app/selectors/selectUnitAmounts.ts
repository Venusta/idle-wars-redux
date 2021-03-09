/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable arrow-body-style */
import { createSelector } from "@reduxjs/toolkit";
import { UnitsNormalised } from "../../types/townStateTypes";
import { UnitId } from "../game/constants";
import { Unit } from "../game/model/unit";
import { TownInterface, TownsInterface, TownsNormalised } from "../slices/townsInitialState";
import { RootState } from "../store";

/**
 * Selects the Towns rps from state
 * @param state RootState
 * @param townId Town id
 */
export const selectUnitAmounts = (state: RootState, townId: string, unitId: UnitId): { town: number, total: number } => {
  const { town, total } = state.towns.id[townId].units.id[unitId] ?? { town: 0, total: 0 };
  console.log("AHHHHHHHHHH");

  return { town, total };
};

// const test = (state: RootState, townId: string): number => (state.towns.id[townId].population);
const getUnit = (state: RootState, townId: string, unitId: UnitId) => {
  // console.log(`getUnit: ${unitId}`);
  return state.towns.id[townId].units.id[unitId];
};

const getState = (state: RootState) => state;

const getTowns = createSelector(
  getState,
  (state) => state.towns,
);

const getTown = createSelector(
  getTowns,
  (towns) => (id: string) => towns.id[id],
);

const getUnit2 = createSelector(
  (state: RootState, townId: string, unitId: UnitId) => state.towns.id[townId].units.id[unitId],
  (units) => units,
);

const getUnittt = createSelector(
  (state: RootState, townId: string) => state.towns.id[townId].units,
  (_: RootState, __: string, unitId: UnitId) => unitId,
  (units: UnitsNormalised, unitId: UnitId) => {
    // console.log("return");
    return units.id[unitId];
  },
);

export const makeSelectUnitAmounts = () => {
  console.log("[Once]: makeSelectUnitAmounts");
  return createSelector(
    getUnit2,
    (unit) => {
      console.log(`[Updt]: selectUnitAmount ID: ${unit?.id}`);
      const { town: inTown, total } = unit ?? { town: 0, total: 0 };
      return { town: inTown, total };
    },
  );
};

const makeSelectTownId = () => createSelector(
  (state: RootState) => state.towns,
  (_: any, townId: string) => townId,
  (towns, townId) => {
    return towns.id[townId];
  },
);

// function createParameterSelector<T>(selector: (params: T) => unknown) {
//   return (state: RootState, params: T) => selector(params);
//   // (state: RootState)   ???   => state.towns(params)
// }

// const getTowns2 = (state: RootState) => state.towns;

// const getTownId2 = createParameterSelector<TownsNormalised>((params) => params.id);
// const getUnitId2 = createParameterSelector<UnitsNormalised>((params) => params.id);

export const makeSelectUnitId = () => {
  console.log("[Once]: makeSelectUnitId");

  return createSelector(
    (state: RootState) => state.towns, // towns select
    (state2: RootState, townId: string) => townId, // townid??? wtf
    (state3: RootState, townId2: string, unitId: UnitId) => unitId, // unitId
    (towns, townId, unitId) => {
      const unit = towns.id[townId].units.id[unitId];
      console.log(`[Updt]: selectUnitAmount ID: ${unit?.id}`);
      const { town: inTown, total } = unit ?? { town: 0, total: 0 };
      return { town: inTown, total };
    },
  );
};
