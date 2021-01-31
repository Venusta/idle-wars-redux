import { Building } from "../../types/types";
import { RootState } from "../store";

/**
 * Selects the Building from state based on id
 * @param state RootState
 * @param id town id
 */
export const selectBuildings = (state: RootState, id: number): Building[] => (state.towns[id].buildings);
