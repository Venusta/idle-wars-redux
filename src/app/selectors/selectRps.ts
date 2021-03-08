import { ResourcesNormalised } from "../../types/townStateTypes";
import { RootState } from "../store";

/**
 * Selects the Towns rps from state
 * @param state RootState
 * @param townId Town id
 */
export const selectRps = (state: RootState, townId: string): ResourcesNormalised => (state.towns.id[townId].rps);
