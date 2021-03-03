/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { BuildingCost, Resources } from "../../types/types";
import { BuildingId, ResourceId, UnitId } from "./constants";

export const isBuildingId = (x: any): x is BuildingId => Object.values(BuildingId).includes(x);

export const isUnitId = (x: any): x is UnitId => Object.values(UnitId).includes(x);

export const isResourceId = (x: any): x is ResourceId => Object.values(ResourceId).includes(x);

export const hasRequirements = (maxPop: number, currentPop: number, resources: Resources, cost: BuildingCost): boolean => {
  // Check available workers
  if (maxPop - currentPop < cost.population) {
    return false;
  }
  // Check resources
  Object.values(ResourceId).forEach((key) => {
    if (resources[key] <= cost.resources[key]) {
      return false; // TODO is this even valid?
    }
    return true;
  });
  // If it hasn't returned false by now then we have the resources, yay!
  return true;
};

export const hasPopulation = (maxPop: number, currentPop: number, popCost: number): boolean => {
  if (maxPop - currentPop < popCost) {
    return false;
  }
  return true;
};

export const hasResources = (resources: Resources, cost: BuildingCost): boolean => {
  // Check resources
  Object.values(ResourceId).forEach((key) => {
    if (resources[key] <= cost.resources[key]) {
      return false; // TODO is this even valid?
    }
    return true;
  });
  // If it hasn't returned false by now then we have the resources, yay!
  return true;
};

export const calculateTimeUntilResources = (currentResources: Resources, resourcesPerSecond: Resources, cost: BuildingCost): number => {
  const timesUntil = [];
  // TODO REWRITE
  // eslint-disable-next-line no-restricted-syntax
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
    }
  }
  // Return the highest number of seconds it will take to get enough resources
  return Math.max(...timesUntil);
};

// type Resources3 = Record<ResourceId, number>;

const getKeys = Object.keys as <T extends Record<string, unknown>>(obj: T) => Array<keyof T>;

function addRecords<T extends string>(all: Partial<Record<T, number>>, modification: Partial<Record<T, number>>) {
  const allCopy = { ...all };
  for (const key of getKeys(modification)) {
    allCopy[key] = (modification[key] ?? 0) + (all[key] ?? 0);
  }

  return allCopy;
}

function addRecordsAll<T extends string>(all: Record<T, number>, some: Partial<Record<T, number>>) {
  const allCopy = { ...all };
  for (const key of getKeys(some)) {
    allCopy[key] = (some[key] ?? 0) + (all[key] ?? 0);
  }

  return allCopy;
}

function multiplyRecords<T extends string>(all: Record<T, number>, multiplier: number) {
  const allCopy = { ...all };
  for (const key of getKeys(all)) {
    allCopy[key] = (all[key] ?? 0) * multiplier;
  }

  return allCopy;
}

export const multiplyResources = (all: Resources, multiplier: number) => {
  return Object.values(ResourceId).reduce((accum, resource) => ({
    ...accum,
    [resource]: (all[resource] * multiplier),
  }), all);
};

export const addResources = (all: Resources, some: Partial<Resources>) => {
  return Object.values(ResourceId).reduce((accum, resource) => ({
    ...accum,
    [resource]: (all[resource] + (some[resource] ?? 0)),
  }), all);
};

export const addArrayOfResources = (array: Resources[]) => {
  return array.reduce((accum, resources) => {
    console.log(resources);

    return {
      ...accum,
      ...resources,
    };
  },
  {
    timber: 0,
    clay: 0,
    iron: 0,
  });
};

export const subtractResources = (all: Resources, some: Partial<Resources>) => {
  return Object.values(ResourceId).reduce((accum, resource) => ({
    ...accum,
    [resource]: (all[resource] - (some[resource] ?? 0)),
  }), all);
};

const resources1: Partial<Resources> = {
  [ResourceId.Clay]: 5,
};

const resources2: Partial<Resources> = {
  [ResourceId.Clay]: 1,
  [ResourceId.Iron]: 3,
};

const resourceSum = addRecords(resources1, resources2);
console.log(resourceSum);

function addRecords2(all: Partial<Resources>, modification: Partial<Resources>) {
  const allCopy = { ...all };
  // eslint-disable-next-line no-restricted-syntax
  for (const key of Object.values(ResourceId)) {
    allCopy[key as ResourceId] = (modification[key as ResourceId] ?? 0) + (all[key as ResourceId] ?? 0);
  }

  return allCopy;
}

const resourceSum2 = addRecords2(resources1, resources2);
console.log(resourceSum2);
