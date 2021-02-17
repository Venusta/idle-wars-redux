import { BuildingQueueItem } from "../slices/queue";
import { RootState } from "../store";
import { BuildingId } from "../game/constants";

/**
 * Selects the Building from state based on id
 * @param state RootState
 * @param townId Building id
 * @param buildingId: BuildingQueueId
 */
export const selectBuildingQueue = (
  state: RootState, townId: string, buildingId: BuildingId
  ): BuildingQueueItem[] => {
    return (state.queue[townId][buildingId]) ?? []; // todo hacky return something?
  };
