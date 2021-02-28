/* eslint-disable @typescript-eslint/no-unused-vars */
import { triggerAsyncId } from "node:async_hooks";
import { BuildingCost, TownInterface, Resources } from "../../types/types";
import { BuildingId, ResourceId, UnitId } from "./constants";
import { baseUnits } from "./units";

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

const addTwoPartial = () => {
  const amount = 5;
  const unitResourceCost: Resources = baseUnits[UnitId.Archer].cost.resources;

  const res1 = Object.values(ResourceId).reduce<Partial<Resources>>((accum, resource) => ({
    ...accum,
    [resource]: (unitResourceCost[resource] * amount), // + accum[resource]
  }), {});

  const res2 = Object.values(ResourceId).reduce<Partial<Resources>>((accum, resource) => ({
    ...accum,
    [resource]: (unitResourceCost[resource] * 20), // + accum[resource]
  }), {});

  // add res1 + res2
};

// const addResources = (res1: Resources, res2: Resources): Resources => Object.values(ResourceId).reduce((accum, res) => {
//   return ({
//     ...accum,
//     [res]: accum[res] += res2[res],
//   });
// }, res1);

const addResourcesPartial = (res1: Resources, res2: Resources) => Object.values(ResourceId).reduce<Partial<Resources>>((accum, res) => ({
  ...accum,
  [res]: (accum[res] ?? 0) + res2[res],
}), {});

const initialResources: Readonly<Resources> = { // never mutate
  timber: 0,
  clay: 0,
  iron: 0,
};
// Object.freeze(initialResources)

const addResourcesPartial2 = (res1: Partial<Resources>, res2: Partial<Resources>): Resources => Object.values(ResourceId).reduce((accum, current) => ({
  ...accum,
  [current]: (res1[current] ?? 0) + (res2[current] ?? 0),
}), initialResources);
console.log("AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH");
console.log(addResourcesPartial2({ clay: 20 }, { clay: 30, timber: 70, iron: 50 }));

console.log(initialResources);

type ResMap = Map<ResourceId, number>;
type ResTuple = [ResourceId, number];
type ResArray = ResTuple[];
const example: ResArray = [
  [ResourceId.Clay, 50],
  [ResourceId.Timber, 20],
  [ResourceId.Iron, 600],
];
const example2: ResArray = [
  [ResourceId.Clay, 80],
  [ResourceId.Timber, 30],
  [ResourceId.Iron, 1650],
];

// type Something = [resArray1: ResArray, resArray2: ResArray];

const addResourceArrays = (resArray1: ResArray, resArray2: ResArray): ResArray => {
  const merged = [...resArray1, ...resArray2];
  const testMap: ResMap = new Map([]);

  merged.forEach(([resId, amount]) => {
    testMap.set(resId, (testMap.get(resId) ?? 0) + amount);
  });
  return Array.from(testMap.entries());
};

const multiplyResources = (resArray: ResArray, multi: number): ResArray => resArray.map(([id, amt]) => ([id, amt * multi]));

console.log(addResourceArrays(example, example2));

console.log(multiplyResources(example, 50));
