import { Resources } from "../../types/types";
import { RootState } from "../store";

/**
 * Selects the Towns rps from state
 * @param state RootState
 * @param townId Town id
 */
export const selectRps = (state: RootState, townId: string): Resources => (state.towns[townId].rps);
