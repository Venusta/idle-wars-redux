/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable arrow-body-style */
import { createSelector } from "@reduxjs/toolkit";
import { createCachedSelector } from "re-reselect";
import { Unit } from "../../types/townStateTypes";
import { UnitId } from "../game/constants";
import { RootState } from "../store";

/**
 * @param state RootState
 * @param townId TownId
 * @param unitId UnitId
 */

const getUnit = (state: RootState, townId: string, unitId: UnitId) => state.towns.id[townId].units.id[unitId];

const getUnitsN = () => {
  console.log("[Once] GetUnitsN");
  return createSelector(
    (state: RootState, townId: string, unitId: UnitId) => state.towns.id[townId].units.id[unitId],
    (unit) => {
      console.log("New Unit calced");
      return unit;
    },
  );
};

export const makeSelectUnitAmounts = () => {
  console.log("[Once]: makeSelectUnitAmounts");
  return createSelector(
    [getUnit],
    (unit) => {
      console.log(`[Updt]: selectUnitAmount ID: ${unit?.id}`);
      const { town: inTown, total } = unit ?? { town: 0, total: 0 };
      return { town: inTown, total };
    },
  );
};

const townsTypeSelector = (state: RootState) => state.towns;
const townTypeSelector = (state: RootState, ownProps: { townId: string; }) => ownProps.townId;
const unitTypeSelector = (state: RootState, ownProps: { unitId: UnitId; }) => ownProps.unitId;

let count = 0;
// const makeData = (towns: TownsNormalised, townId: string, unitId: UnitId) => {
const makeData = (unit: Unit | undefined) => {
  console.log(`-- recalculate: ${unit?.id} ${count += 1}`);
  const { town: inTown, total } = unit ?? { town: 0, total: 0 };
  return { town: inTown, total };
};

export const makeSelectUnitAmountsC = () => createCachedSelector(
  (state: RootState, townId: string, unitId: UnitId) => state.towns.id[townId].units.id[unitId],
  (unit) => makeData(unit),
)((_state_, townId, unitId) => `${townId}:${unitId}`);
