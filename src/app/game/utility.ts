/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { BuildingCostTuple, ResourcesTuple } from "../../types/types";
import { ResourcesNormalised, BuildingCost } from "../slices/townStateTypes";
import { BuildingId, RES_AMOUNT_TUPLE, UnitId } from "./constants";

export const isBuildingId = (x: any): x is BuildingId => Object.values(BuildingId).includes(x);

export const isUnitId = (x: any): x is UnitId => Object.values(UnitId).includes(x);

// export const isResourceId = (x: any): x is ResourceId => Object.values(ResourceId).includes(x);

// const hasPopulation = (maxPop: number, currentPop: number, popCost: number): boolean => {
//   if (maxPop - currentPop < popCost) {
//     return false;
//   }
//   return true;
// };

// const hasResources = (resources: ResourcesTuple, resourceCost: ResourcesTuple): boolean => {
//   const x = resources.reduce((prev, [resource, amountInStorage]): boolean => {
//     const index = resourceCost.findIndex(([id]) => id === resource);
//     if (index === -1) {
//       return false;
//     }
//     if (amountInStorage < resourceCost[index][RES_AMOUNT_TUPLE]) {
//       return false;
//     }
//     return prev;
//   }, true);
//   return x;
// };

// const hasRequirements = (maxPop: number, currentPop: number, resources: ResourcesTuple, cost: BuildingCostTuple): boolean => {
//   // Check available workers
//   const hasPop = hasPopulation(maxPop, currentPop, cost.population);
//   // Check resources
//   const hasRes = hasResources(resources, cost.resources);

//   return hasPop && hasRes;
// };

// todo maybe rewrite how this is calced so it isn't required to be hit so often
// predict resources if rps is constant? idk
// eslint-disable-next-line arrow-body-style
// export const calculateTimeUntilResources = (currentResources: ResourcesTuple, resourcesPerSecond: ResourcesTuple, cost: BuildingCostTuple): number => {
//   return cost.resources.reduce((prev, [id, amount]) => {
//     const index = currentResources.findIndex(([foundId]) => foundId === id);
//     const index2 = resourcesPerSecond.findIndex(([foundId]) => foundId === id);
//     if (index === -1 || index2 === -1) {
//       console.error("AHHHHHHHHHHHHHHHHHHHHHHHH");
//       return 0;
//     }
//     // Calculate seconds until enough resources
//     const amountNeeded = amount - currentResources[index][RES_AMOUNT_TUPLE];
//     // Return the highest number of seconds it will take to get enough resources
//     return Math.max(prev, (amountNeeded / resourcesPerSecond[index2][RES_AMOUNT_TUPLE]));
//   }, 0);
// };
