import { BuildingCost, TownInterface } from "../../types/types";
import { BuildingId, BuildingQueueId, ResourceId, UnitId } from "./constants";

export const isBuildingId = (x: any): x is BuildingId => {
  return Object.values(BuildingId).includes(x);
};

export const isUnitId = (x: any): x is UnitId => {
  return Object.values(UnitId).includes(x);
};

export const isResourceId = (x: any): x is ResourceId => {
  return Object.values(ResourceId).includes(x);
};

export const isBuildingQueueId = (x: any): x is BuildingQueueId => {
  return Object.values(BuildingQueueId).includes(x);
};

export const hasResources = (town: TownInterface, cost: BuildingCost): boolean => {
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

export const calculateTimeUntilResources = (town: TownInterface, cost: BuildingCost): number => {
  const timesUntil = [];
  for (const [resourceId, amount] of Object.entries(cost.resources)) {
    if (isResourceId(resourceId)) {
      const amountNeeded = amount - town.resources[resourceId];
      if (amountNeeded > 0) {
        // Calculate seconds until enough resources
        timesUntil.push(amountNeeded / town.rps[resourceId]);        
      } else {
        // Already have enough resources so 0 seconds until enough
        timesUntil.push(0);
      }
    };
  };  
  // Return the highest number of seconds it will take to get enough resources
  return Math.max(...timesUntil);
};