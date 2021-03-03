import { RootState } from "../store";
import { ResourceId } from "../game/constants";

/**
 * Selects the Towns rps from state
 * @param state RootState
 * @param townId Town id
 * @param resourceId: ResourceId
 */
// eslint-disable-next-line arrow-body-style
export const selectSingleRps = (state: RootState, townId: string, resourceId: ResourceId): number => {
  const [, amount] = state.towns[townId].rps.find(([res]) => res === resourceId) ?? [resourceId, 0];
  return amount;
};
