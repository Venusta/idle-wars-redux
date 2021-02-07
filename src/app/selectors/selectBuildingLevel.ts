import { RootState } from "../store";
import { BuildingId } from "../game/constants"

/**
 * Selects the Building from state based on id
 * @param state RootState
 * @param id town id
 */
export const selectBuildingLevel = (state: RootState, townId: string, buildingId: BuildingId): number => (state.towns[townId].buildings[buildingId].level) ;
