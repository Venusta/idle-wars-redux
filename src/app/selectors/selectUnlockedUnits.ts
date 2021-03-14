/* eslint-disable arrow-body-style */
import { baseBuildings } from "../game/buildings";
import { BuildingIdType, UnitIdProductionType } from "../game/constants";
import { UnitProductionBuilding } from "../game/model/buildings/unitProductionBuilding";
import { RootState } from "../store";

/**
 * Selects the Towns rps from state
 * @param state RootState
 * @param townId Town id
 * @param buildingId BuildingIdType
 */
// TODO cache thingy
export const selectUnlockedUnits = (
  state: RootState,
  townId: string,
  buildingId: BuildingIdType,
): UnitIdProductionType[] => {
  const buildingData = baseBuildings[buildingId];
  if (buildingData instanceof UnitProductionBuilding) {
    const { creates } = buildingData;
    return creates.reduce((prev: UnitIdProductionType[], id) => {
      if ((state.towns.id[townId].unlocked.id[id]?.level ?? 0) > 0) {
        return [...prev, id];
      }
      return prev;
    }, []);
  }
  return [];
};
