import { createSelector } from "@reduxjs/toolkit";
import { selectResource } from "./selectResource";

export const selectEnoughResource = createSelector(
  selectResource,
  (resourceAmount) => (multipliedCost: number) => resourceAmount >= (multipliedCost),
);
