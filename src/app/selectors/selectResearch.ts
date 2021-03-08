import { ResearchNormalised } from "../../types/townStateTypes";
import { RootState } from "../store";

/**
 * Selects the Towns rps from state
 * @param state RootState
 * @param townId Town id
 */
export const selectResearch = (state: RootState, townId: string): ResearchNormalised => (state.towns.id[townId].unlocked);
