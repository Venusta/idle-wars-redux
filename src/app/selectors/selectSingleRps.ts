import { RootState } from "../store";
import { ResourceId } from "../game/constants";

/**
 * Selects the Towns rps from state
 * @param state RootState
 * @param townId Town id
 * @param resourceId: ResourceId
 */
export const selectSingleRps = (state: RootState, townId: string, resourceId: ResourceId): number => (state.towns[townId].rps[resourceId]);
