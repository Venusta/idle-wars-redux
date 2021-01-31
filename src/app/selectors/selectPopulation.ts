import { Population } from "../../types/types";
import { RootState } from "../store";

/**
 * Selects the Population from state based on id
 * @param state RootState
 * @param id town id
 */
export const selectPopulation = (state: RootState, townId: number): Population => (state.towns[townId].population);
