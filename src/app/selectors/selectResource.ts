import { RootState } from "../store";
import { ResourceId } from "../game/constants";

/**
 * Selects the Towns resources from state
 * @param state RootState
 * @param townId Town id
 * @param resourceId Resource id
 */
export const selectResource = (state: RootState, townId: string, resourceId: ResourceId): number => {
  const [, amount] = state.towns[townId].resources.find(([res]) => res === resourceId) ?? [resourceId, 0];
  return amount;
};
