import { createSelector } from "@reduxjs/toolkit";
import { selectResources } from "./selectResources";
import { selectPopulation } from "./selectPopulation";


export const selectSomething = createSelector(
  selectResources,
  selectPopulation,
  (resources, population) => ({
    resources,
    population,
  }),
);
