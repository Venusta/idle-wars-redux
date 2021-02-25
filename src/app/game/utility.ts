import { BuildingCost, TownInterface, Resources } from "../../types/types";
import { BuildingId, ResourceId, UnitId } from "./constants";

export const isBuildingId = (x: any): x is BuildingId => {
  return Object.values(BuildingId).includes(x);
};

export const isUnitId = (x: any): x is UnitId => {
  return Object.values(UnitId).includes(x);
};

export const isResourceId = (x: any): x is ResourceId => {
  return Object.values(ResourceId).includes(x);
};

export const hasResourcesold = (town: TownInterface, cost: BuildingCost): boolean => {
  // Check available workers
  if (town.maxPopulation - town.population < cost.population) {
    return false;
  }
  // Check resources
  for (const [resourceId, amount] of Object.entries(cost)) {
    if (isResourceId(resourceId)) {
      if (town.resources[resourceId] < amount) return false;
    }
  }
  // If it hasn't returned false by now then we have the resources, yay!
  return true;
};

export const hasRequirements = (maxPop: number, currentPop: number, resources: Resources, cost: BuildingCost): boolean => {
  // Check available workers
  if (maxPop - currentPop < cost.population) {
    return false;
  }
  // Check resources
  Object.values(ResourceId).forEach((key) => {
    if (resources[key] <= cost.resources[key]) {
      return false;
    }
  })
  // If it hasn't returned false by now then we have the resources, yay!
  return true;
};

export const hasPopulation = (maxPop: number, currentPop: number, popCost: number): boolean => {
  if (maxPop - currentPop < popCost) {
    return false;
  }
  return true;
}

export const hasResources = (resources: Resources, cost: BuildingCost): boolean => {
  // Check resources
  Object.values(ResourceId).forEach((key) => {
    if (resources[key] <= cost.resources[key]) {
      return false;
    }
  })
  // If it hasn't returned false by now then we have the resources, yay!
  return true;
}

export const calculateTimeUntilResources = (currentResources: Resources, resourcesPerSecond: Resources, cost: BuildingCost): number => {
  // TODO don't use the entire town object
  const timesUntil = [];
  for (const [resourceId, amount] of Object.entries(cost.resources)) {
    if (isResourceId(resourceId)) {
      const amountNeeded = amount - currentResources[resourceId];
      if (amountNeeded > 0) {
        // Calculate seconds until enough resources
        timesUntil.push(amountNeeded / resourcesPerSecond[resourceId]);
      } else {
        // Already have enough resources so 0 seconds until enough
        timesUntil.push(0);
      }
    };
  };
  // Return the highest number of seconds it will take to get enough resources
  return Math.max(...timesUntil);
};