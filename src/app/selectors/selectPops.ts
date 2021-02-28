import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

/**
 * Selects the towns population stats from state
 * @param state RootState
 * @param townId Town id
 */

const selectPop = (state: RootState, townId: string) => (state.towns[townId].population);
const selectMaxPop = (state: RootState, townId: string) => (state.towns[townId].maxPopulation);

export const selectPops = createSelector(
  selectPop,
  selectMaxPop,
  (population, maxPopulation) => ({
    population,
    maxPopulation,
  }),
);
