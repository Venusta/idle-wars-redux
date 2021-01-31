import { Building } from "../../types/types";
import { RootState } from "../store";
import { BuildingId } from "../game/constants"

/**
 * Selects the Building from state based on id
 * @param state RootState
 * @param id town id
 */
export const selectBuilding = (state: RootState, townId: number, buildingId: BuildingId): Building => (state.towns[townId].buildings[buildingId]);
