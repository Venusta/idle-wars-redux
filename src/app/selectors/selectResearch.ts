import { ResearchList } from "../../types/types";
import { RootState } from "../store";

/**
 * Selects the Towns rps from state
 * @param state RootState
 * @param townId Town id
 */
export const selectResearch = (state: RootState, townId: string): ResearchList => (state.towns[townId].unlocked);
