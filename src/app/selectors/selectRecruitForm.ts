import {
  UnitIdProductionType,
  UnitProductionBuildingIdType,
} from "../game/constants";
import { RecruitFormUnitData } from "../slices/misc";
import { RootState } from "../store";

/**
 * Selects the recruit forms
 * @param state RootState
 * @param unitId UnitId
 */

export const selectRecruitForm = (
  state: RootState,
  buildingId: UnitProductionBuildingIdType,
  unitId: UnitIdProductionType,
): RecruitFormUnitData | undefined => state.misc.forms.recruit.id[buildingId][unitId];
