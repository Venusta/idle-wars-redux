import { BuildingQueueId } from "../game/constants";
import { QueueItem } from "../slices/queue";
import { RootState } from "../store";

/**
 * Selects the Building from state based on id
 * @param state RootState
 * @param townId Building id
 * @param buildingId: BuildingQueueId
 */
export const selectBuildingQueue = (state: RootState, townId: string, buildingId: BuildingQueueId): QueueItem[] => (state.queue[townId][buildingId]);
