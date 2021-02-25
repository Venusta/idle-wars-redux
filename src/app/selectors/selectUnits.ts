import { UnitList } from "../../types/types";
import { RootState } from "../store";

/**
 * Selects the Towns rps from state
 * @param state RootState
 * @param townId Town id
 */
export const selectUnits = (state: RootState, townId: string): UnitList => (state.towns[townId].units);
