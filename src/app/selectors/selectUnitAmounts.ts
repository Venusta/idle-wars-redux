/* eslint-disable arrow-body-style */
import { UnitId } from "../game/constants";
import { RootState } from "../store";

/**
 * Selects the Towns rps from state
 * @param state RootState
 * @param townId Town id
 */
export const selectUnitAmounts = (state: RootState, townId: string, unitId: UnitId): { town: number, total: number } => {
  const { town, total } = state.towns.id[townId].units.id[unitId] ?? { town: 0, total: 0 };
  return { town, total };
};
