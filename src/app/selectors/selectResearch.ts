import { ResearchList } from "../../types/types";
import { ResearchNormalised } from "../slices/townStateTypes";
import { RootState } from "../store";

/**
 * Selects the Towns rps from state
 * @param state RootState
 * @param townId Town id
 */
export const selectResearch = (state: RootState, townId: string): ResearchNormalised => (state.towns.byId[townId].unlocked);
