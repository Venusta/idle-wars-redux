/* eslint-disable function-paren-newline */
import { createSelector } from "@reduxjs/toolkit";
import memoize from "lodash.memoize";
import { RootState } from "../store";
import { UnitProductionBuildingIdType } from "../game/constants";
import { FormsRecruitUnitData } from "../slices/misc";
import { baseBuildings } from "../game/buildings";

const unitFormsSelector = (state: RootState) => state.misc.forms.recruit.units.id;

export const buildingFormsSelector = createSelector(
  unitFormsSelector,
  (unitForms) => memoize(
    (buildingId: UnitProductionBuildingIdType) => {
      console.log("SDFsdfadfg");
      
      return baseBuildings[buildingId].creates.reduce(
        (prev: FormsRecruitUnitData[], unitId) => {
          const data = unitForms[unitId];
          if (data === undefined) return prev;

          return [...prev, data];
        }, []);
    },
  ),
);

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

const getForms = (
  state: RootState,
  buildingId: UnitProductionBuildingIdType,
): FormsRecruitUnitData[] => baseBuildings[buildingId].creates.reduce(
  (prev: FormsRecruitUnitData[], unitId) => {
    const data = state.misc.forms.recruit.units.id[unitId];
    if (data === undefined) return prev;

    return [...prev, data];
  }, []);

export const makeselectRecruitFormsDataBuilding = () => createSelector(
  (getForms),
  (forms) => forms,
);

// export const makeSelectUnitAmounts = () => {
//   console.log("[Once]: makeSelectUnitAmounts");
//   return createSelector(
//     [getUnit],
//     (unit) => {
//       console.log(`[Updt]: selectUnitAmount ID: ${unit?.id}`);
//       const { home, total } = unit ?? { home: 0, total: 0 };
//       return { home, total };
//     },
//   );
// };
