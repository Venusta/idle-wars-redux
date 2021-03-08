import { Building } from "../../types/types";
import { RootState } from "../store";
import { BuildingId } from "../game/constants";

/**
 * Selects the Building from state based on id
 * @param state RootState
 * @param townId town id
 * @param buildingId building id
 */
export const selectBuilding = (state: RootState, townId: string, buildingId: BuildingId): Building => (state.towns.id[townId].buildings.id[buildingId]);
