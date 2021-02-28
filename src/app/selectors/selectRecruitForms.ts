import { RootState } from "../store";
import { RecruitForm } from "../slices/misc";

/**
 * Selects the recruit forms
 * @param state RootState
 */
export const selectRecruitForms = (state: RootState): RecruitForm => (state.misc.forms.recruit);
