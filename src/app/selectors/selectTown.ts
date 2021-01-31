import { Town } from "../../types/types";
import { RootState } from "../store";

/**
 * Selects the Town from state based on id
 * @param state RootState
 * @param id town id
 */
export const selectTown = (state: RootState, id: number): Town => (state.towns[id]);
