import { RootState } from "../store";
import { BuildingId } from "../game/constants";
import { BuildingQueueItem } from "../../types/types";

/**
 * Selects the Building from state based on id
 * @param state RootState
 * @param townId Building id
 * @param buildingId: BuildingQueueId
 */
export const selectBuildingQueue = (
  state: RootState, townId: string, buildingId: BuildingId
  ): BuildingQueueItem[] => {
    return (state.towns[townId].queues[buildingId]) ?? []; // todo hacky return something?
  };
