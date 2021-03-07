import { RootState } from "../store";
import { BuildingId } from "../game/constants";
import { UnitQueueItem } from "../slices/townStateTypes";

/**
 * Selects the Building from state based on id
 * @param state RootState
 * @param townId Building id
 * @param buildingId: BuildingQueueId
 */
export const selectUnitQueue = (
  state: RootState, townId: string, buildingId: BuildingId,
): UnitQueueItem[] => (state.towns.byId[townId].queues.units[buildingId]) ?? []; // todo hacky return something?
