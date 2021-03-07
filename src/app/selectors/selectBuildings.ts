import { BuildingsNormalised } from "../slices/townStateTypes";
import { RootState } from "../store";

/**
 * Selects the Building from state based on id
 * @param state RootState
 * @param townId town id
 */
export const selectBuildings = (state: RootState, townId: string): BuildingsNormalised => (state.towns.byId[townId].buildings);
