/* eslint-disable arrow-body-style */
import { RootState } from "../store";
import { ResourceId } from "../game/constants";

/**
 * Selects the Towns resources from state
 * @param state RootState
 * @param townId Town id
 * @param resourceId Resource id
 */
export const selectResource = (state: RootState, townId: string, resourceId: ResourceId): number => {
  return state.towns.id[townId].resources.id[resourceId]?.amount ?? 0;
};
