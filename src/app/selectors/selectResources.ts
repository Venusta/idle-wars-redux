import { Resources } from "../../types/types";
import { RootState } from "../store";

/**
 * Selects the Resources from state based on id
 * @param state RootState
 * @param townId Resources id
 */
export const selectResources = (state: RootState, townId: number): Resources => (state.towns[townId].resources);
