import { RootState } from "../store";
import { RecruitFormUnits } from "../slices/misc";
import { UnitProductionBuildingIdType } from "../game/constants";

/**
 * Selects the recruit forms
 * @param state RootState
 */
export const selectRecruitForms = (state: RootState, buildingId: UnitProductionBuildingIdType): RecruitFormUnits => state.misc.forms.recruit.id[buildingId];
