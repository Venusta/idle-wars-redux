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

export const selectUnitAmounts2 = createSelector((state: RootState, townId: string, unitId: UnitId) => {
  return state.towns.id[townId].units.id[unitId];
}, (idk) => {
  console.log("Please no");
  const { town, total } = idk ?? { town: 0, total: 0 };

  return { town, total };
});

export const makeSelectUnitAmounts = () => createSelector(
  (state: RootState, townId: string, unitId: UnitId) => state.towns.id[townId].units.id[unitId],
  (idk) => {
    console.log(`selectUnitAmount ID: ${idk?.id}`);
    const { town, total } = idk ?? { town: 0, total: 0 };
    return { town, total };
  },
);
