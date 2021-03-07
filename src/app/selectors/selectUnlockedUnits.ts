/* eslint-disable arrow-body-style */
import { baseBuildings } from "../game/buildings";
import { BuildingId, UnitId } from "../game/constants";
import { UnitProductionBuilding } from "../game/model/unitProductionBuilding";
import { RootState } from "../store";

/**
 * Selects the Towns rps from state
 * @param state RootState
 * @param townId Town id
 * @param buildingId Building id
 */
export const selectUnlockedUnits = (state: RootState, townId: string, buildingId: BuildingId): UnitId[] => {
  const buildingData = baseBuildings[buildingId];
  if (buildingData instanceof UnitProductionBuilding) {
    const { creates } = buildingData;
    return creates.reduce((prev: UnitId[], id) => {
      if ((state.towns.byId[townId].unlocked.byId[id]?.level ?? 0) > 0) {
        return [...prev, id];
      }
      return prev;
    }, []);
  }
  return [];
};
