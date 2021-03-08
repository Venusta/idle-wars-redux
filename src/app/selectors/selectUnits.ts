import { UnitsNormalised } from "../../types/townStateTypes";
import { RootState } from "../store";

/**
 * Selects the Towns rps from state
 * @param state RootState
 * @param townId Town id
 */
export const selectUnits = (state: RootState, townId: string): UnitsNormalised => (state.towns.id[townId].units);
