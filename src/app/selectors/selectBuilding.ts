import { Building } from "../../types/types";
import { RootState } from "../store";

/**
 * Selects the Building from state based on id
 * @param state RootState
 * @param id town id
 */
export const selectBuilding = (state: RootState, townId: number, buildingId:number): Building => (state.towns[townId].buildings[buildingId]);
