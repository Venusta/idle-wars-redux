import { UnitIdProductionType } from "../game/constants";
import { FormsRecruitUnitData } from "../slices/misc";
import { RootState } from "../store";

/**
 * Selects the recruit forms
 * @param state RootState
 * @param unitId UnitId
 */

export const selectRecruitForm = (
  state: RootState,
  unitId: UnitIdProductionType,
): FormsRecruitUnitData | undefined => state.misc.forms.recruit.units.id[unitId];
