import { BuildingQueueId } from "../game/constants";
import { BuildingQueueItem, UnitQueueItem } from "../slices/queue";
import { RootState } from "../store";

/**
 * Selects the Building from state based on id
 * @param state RootState
 * @param townId Building id
 * @param buildingId: BuildingQueueId
 */
export const selectBuildingQueue = (
  state: RootState, townId: string, buildingId: BuildingQueueId
  ): BuildingQueueItem[] | UnitQueueItem[] => {
    return (state.queue[townId][buildingId]);
  };
