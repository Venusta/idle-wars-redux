import { BuildingsNormalised } from "../../types/townStateTypes";
import { RootState } from "../store";

/**
 * Selects the Building from state based on id
 * @param state RootState
 * @param townId town id
 */
export const selectBuildings = (
  state: RootState,
  townId: string,
): BuildingsNormalised => state.towns.id[townId].buildings;
