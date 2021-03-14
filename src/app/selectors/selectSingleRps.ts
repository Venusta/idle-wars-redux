import { RootState } from "../store";
import { ResourceIdType } from "../game/constants";

/**
 * Selects the Towns rps from state
 * @param state RootState
 * @param townId Town id
 * @param resourceId: ResourceIdType
 */
// eslint-disable-next-line arrow-body-style
export const selectSingleRps = (
  state: RootState,
  townId: string,
  resourceId: ResourceIdType,
): number => state.towns.id[townId].rps.id[resourceId]?.amount ?? 0;
