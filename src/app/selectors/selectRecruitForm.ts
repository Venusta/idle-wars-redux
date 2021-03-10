import { UnitIdType } from "../game/constants";
import { RootState } from "../store";

/**
 * Selects the recruit forms
 * @param state RootState
 * @param unitId UnitId
 */
export const selectRecruitForm = (state: RootState, unitId: UnitIdType): [UnitIdType, number] | undefined => state.misc.forms.recruit[unitId];
