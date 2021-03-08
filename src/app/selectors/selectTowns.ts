import { TownsNormalised } from "../slices/townsInitialState";
import { RootState } from "../store";

/**
 * Selects all towns from state
 * @param state RootState
 */
export const selectTowns = (state: RootState): TownsNormalised => (state.towns);
