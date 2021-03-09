/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable arrow-body-style */
import { createSelector } from "@reduxjs/toolkit";
import { UnitId } from "../game/constants";
import { RootState } from "../store";

/**
 * Selects the Towns rps from state
 * @param state RootState
 * @param townId Town id
 */
// export const selectUnitAmounts = (state: RootState, townId: string, unitId: UnitId): { town: number, total: number } => {
//   const { town, total } = state.towns.id[townId].units.id[unitId] ?? { town: 0, total: 0 };
//   console.log("AHHHHHHHHHH");

//   return { town, total };
// };

// const test = (state: RootState, townId: string): number => (state.towns.id[townId].population);

export const selectUnitAmounts2 = createSelector(
  (state: RootState, townId: string, unitId: UnitId) => state.towns.id[townId].units.id[unitId], (unit) => {
    console.log("Please no");
    const { town, total } = unit ?? { town: 0, total: 0 };

    return { town, total };
  },
);

const getTotal = (state: RootState, townId: string, unitId: UnitId) => state.towns.id[townId].units.id[unitId]?.total ?? 0;
const getInTown = (state: RootState, townId: string, unitId: UnitId) => state.towns.id[townId].units.id[unitId]?.town ?? 0;

export const makeSelectUnitAmounts2 = () => createSelector(
  getTotal,
  getInTown,
  (total, town) => {
    console.log("makeSelectUnitAmounts2");
    return { town, total };
  },
);

const getUnit = (state: RootState, townId: string, unitId: UnitId) => state.towns.id[townId].units.id[unitId];

export const makeSelectUnitAmounts3 = () => createSelector(
  getUnit,
  (unit) => {
    console.log("makeSelectUnitAmounts2");
    const { town, total } = unit ?? { town: 0, total: 0 };
    return { town, total };
  },
);

export const makeSelectUnitAmounts = () => createSelector(
  (state: RootState, townId: string, unitId: UnitId) => state.towns.id[townId].units.id[unitId],
  (unit) => {
    console.log(`selectUnitAmount ID: ${unit?.id}`);
    const { town, total } = unit ?? { town: 0, total: 0 };
    return { town, total };
  },
);
