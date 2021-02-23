import { TownsInterface } from "../../types/types";
import { RootState } from "../store";

/**
 * Selects all towns from state
 * @param state RootState
 */
export const selectTowns = (state: RootState): TownsInterface => (state.towns);
