/* eslint-disable arrow-body-style */
import { baseBuildings } from "../game/buildings";
import { BuildingIdType, UnitIdProduction } from "../game/constants";
import { UnitProductionBuilding } from "../game/model/buildings/unitProductionBuilding";
import { RootState } from "../store";

/**
 * Selects the Towns rps from state
 * @param state RootState
 * @param townId Town id
 * @param buildingId Building id
 */
export const selectUnlockedUnits = (state: RootState, townId: string, buildingId: BuildingIdType): UnitIdProduction[] => {
  const buildingData = baseBuildings[buildingId];
  if (buildingData instanceof UnitProductionBuilding) {
    const { creates } = buildingData;
    return creates.reduce((prev: UnitIdProduction[], id) => {
      if ((state.towns.id[townId].unlocked.id[id]?.level ?? 0) > 0) {
        return [...prev, id];
      }
      return prev;
    }, []);
  }
  return [];
};
