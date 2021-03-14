/* eslint-disable arrow-body-style */
/* eslint-disable function-paren-newline */
import { createSelector } from "@reduxjs/toolkit";
import memoize from "lodash.memoize";
import { createCachedSelector } from "re-reselect";
import { RootState } from "../store";
import { BuildingIdRecruitType, BuildingIdUnitProductionType, FormUiStuff } from "../game/constants";
import { FormsRecruitUnitData } from "../slices/misc";
import { baseBuildings } from "../game/buildings";

const unitFormsSelector = (state: RootState) => state.misc.forms.recruit.units.id;

const buildingFormsSelector = createSelector(
  unitFormsSelector,
  (unitForms) => {
    console.log("ahhh");
    return memoize((buildingId: BuildingIdUnitProductionType) => {
      console.log("SDFsdfadfg");

      return baseBuildings[buildingId].creates.reduce(
        (prev: FormsRecruitUnitData[], unitId) => {
          const data = unitForms[unitId];
          if (data === undefined) return prev;

          return [...prev, data];
        }, []);
    });
  },
);

export const createBuildingFormsSelector = createCachedSelector(
  unitFormsSelector,
  (state: RootState, buildingId: BuildingIdRecruitType) => buildingId,
  (unitForms, buildingId: BuildingIdRecruitType) => {
    console.log(`CACHE FOR: ${buildingId}`);

    return FormUiStuff[buildingId].units.reduce(
      (prev: FormsRecruitUnitData[], unitId) => {
        const data = unitForms[unitId];
        if (data === undefined) return prev;

        return [...prev, data];
      }, []);
  },
)(
  (_state_, buildingId) => buildingId,
);

/**
 * Selects the recruit forms
 * @param state RootState
 * @param buildingId: UnitProductionBuildingIdType
 */
export const selectRecruitFormsDataBuilding = (
  state: RootState,
  buildingId: BuildingIdUnitProductionType,
): FormsRecruitUnitData[] => baseBuildings[buildingId].creates.reduce(
  (prev: FormsRecruitUnitData[], unitId) => {
    const data = state.misc.forms.recruit.units.id[unitId];
    if (data === undefined) return prev;

    return [...prev, data];
  },
  [],
);
