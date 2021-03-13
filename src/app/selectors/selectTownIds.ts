import { RootState } from "../store";

/**
 * Selects TownIds from the state
 * @param state RootState
 */
export const selectTownIds = (state: RootState): string[] => (state.towns.all);
