/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { BuildingCost, Resources } from "../../types/types";
import { BuildingId, ResourceId, UnitId } from "./constants";

export const isBuildingId = (x: any): x is BuildingId => Object.values(BuildingId).includes(x);

export const isUnitId = (x: any): x is UnitId => Object.values(UnitId).includes(x);

// export const isResourceId = (x: any): x is ResourceId => Object.values(ResourceId).includes(x);

export const hasPopulation = (maxPop: number, currentPop: number, popCost: number): boolean => {
  if (maxPop - currentPop < popCost) {
    return false;
  }
  return true;
};

export const hasResources = (resources: Resources, resourceCost: Resources): boolean => {
  const x = resources.reduce((prev, [resource, amountInStorage]): boolean => {
    const index = resourceCost.findIndex(([id]) => id === resource);
    if (index === -1) {
      return false;
    }
    if (amountInStorage < resourceCost[index][1]) {
      return false;
    }
    return prev;
  }, true);
  return x;
};

export const hasRequirements = (maxPop: number, currentPop: number, resources: Resources, cost: BuildingCost): boolean => {
  // Check available workers
  const hasPop = hasPopulation(maxPop, currentPop, cost.population);
  // Check resources
  const hasRes = hasResources(resources, cost.resources);

  return hasPop && hasRes;
};

export const calculateTimeUntilResources = (currentResources: Resources, resourcesPerSecond: Resources, cost: BuildingCost): number => {
  return 0;
  // const timesUntil = [];
  // // TODO REWRITE
  // // eslint-disable-next-line no-restricted-syntax
  // for (const [resourceId, amount] of Object.entries(cost.resources)) {
  //   if (isResourceId(resourceId)) {
  //     const amountNeeded = amount - currentResources[resourceId];
  //     if (amountNeeded > 0) {
  //       // Calculate seconds until enough resources
  //       timesUntil.push(amountNeeded / resourcesPerSecond[resourceId]);
  //     } else {
  //       // Already have enough resources so 0 seconds until enough
  //       timesUntil.push(0);
  //     }
  //   }
  // }
  // // Return the highest number of seconds it will take to get enough resources
  // return Math.max(...timesUntil);
};
