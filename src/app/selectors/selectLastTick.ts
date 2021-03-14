import { RootState } from "../store";

/**
 * Selects the last tick
 * @param state RootState
 */
export const selectLastTick = (state: RootState): number => state.misc.timeLastProcessed;
