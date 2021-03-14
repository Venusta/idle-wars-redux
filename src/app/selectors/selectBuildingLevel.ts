import { RootState } from "../store";
import { BuildingIdType } from "../game/constants";

/**
 * Selects the Building from state based on id
 * @param state RootState
 * @param id town id
 */
export const selectBuildingLevel = (
  state: RootState,
  townId: string,
  buildingId: BuildingIdType,
): number => state.towns.id[townId].buildings.id[buildingId].level;
