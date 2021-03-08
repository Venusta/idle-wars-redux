import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

/**
 * Selects the towns population stats from state
 * @param state RootState
 * @param townId Town id
 */

export const selectPop = (state: RootState, townId: string): number => (state.towns.byId[townId].population);
export const selectMaxPop = (state: RootState, townId: string): number => (state.towns.byId[townId].maxPopulation);

export const selectPops = createSelector(
  selectPop,
  selectMaxPop,
  (population, maxPopulation) => ({
    population,
    maxPopulation,
  }),
);
