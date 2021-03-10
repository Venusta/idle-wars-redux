/* eslint-disable arrow-body-style */
import { ResourceIdType } from "../game/constants";
import { RootState } from "../store";

/**
 * Selects the Towns resources from state
 * @param state RootState
 * @param townId Town id
 * @param resourceId ResourceIdType
 */
export const selectResource = (state: RootState, townId: string, resourceId: ResourceIdType): number => {
  return state.towns.id[townId].resources.id[resourceId]?.amount ?? 0;
};
