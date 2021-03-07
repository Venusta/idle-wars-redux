import { TownInterface } from "../slices/newTownsInitialState";
import { RootState } from "../store";

/**
 * Selects the Town from state based on id
 * @param state RootState
 * @param townId town id
 */
export const selectTown = (state: RootState, townId: string): TownInterface => (state.towns.byId[townId]);
