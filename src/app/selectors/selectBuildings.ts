import { BuildingList } from "../../types/types";
import { RootState } from "../store";

/**
 * Selects the Building from state based on id
 * @param state RootState
 * @param townId town id
 */
export const selectBuildings = (state: RootState, townId: number): BuildingList => (state.towns[townId].buildings);
