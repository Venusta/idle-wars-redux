import { RootState } from "../store";
import { UnitId } from "../game/constants";

/**
 * Selects the recruit forms
 * @param state RootState
 * @param unitId UnitId
 */
export const selectRecruitForm = (state: RootState, unitId: UnitId): [UnitId, number] | undefined => state.misc.forms.recruit[unitId];
