import { BuildingDataType } from "../../types/townStateTypes";
import { BuildingIdType } from "../game/constants";
import { RootState } from "../store";

/**
 * Selects the Building from state based on id
 * @param state RootState
 * @param townId town id
 * @param buildingId building id
 */
export const selectBuilding = (
  state: RootState,
  townId: string,
  buildingId: BuildingIdType,
): BuildingDataType => state.towns.id[townId].buildings.id[buildingId];
