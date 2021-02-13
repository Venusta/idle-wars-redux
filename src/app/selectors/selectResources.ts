import { Resources } from "../../types/types";
import { RootState } from "../store";

/**
 * Selects the Towns resources from state
 * @param state RootState
 * @param townId Town id
 */
export const selectResources = (state: RootState, townId: string): Resources => (state.towns[townId].resources);
