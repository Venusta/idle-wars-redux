import { ResourcesTuple } from "../../types/types";
import { ResourcesNormalised } from "../slices/townStateTypes";
import { RootState } from "../store";

/**
 * Selects the Towns resources from state
 * @param state RootState
 * @param townId Town id
 */
export const selectResources = (state: RootState, townId: string): ResourcesNormalised => (state.towns.byId[townId].resources);
