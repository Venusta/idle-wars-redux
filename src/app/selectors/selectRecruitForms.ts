/* eslint-disable function-paren-newline */
import { RootState } from "../store";
import { UnitProductionBuildingIdType } from "../game/constants";
import { FormsRecruitUnitData } from "../slices/misc";
import { baseBuildings } from "../game/buildings";

/**
 * Selects the recruit forms
 * @param state RootState
 * @param buildingId: UnitProductionBuildingIdType
 */
export const selectRecruitFormsDataBuilding = (
  state: RootState,
  buildingId: UnitProductionBuildingIdType,
): FormsRecruitUnitData[] => baseBuildings[buildingId].creates.reduce(
  (prev: FormsRecruitUnitData[], unitId) => {
    const data = state.misc.forms.recruit.units.id[unitId];
    if (data === undefined) return prev;

    return [...prev, data];
  }, []);
