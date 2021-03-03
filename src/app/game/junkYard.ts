/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable arrow-body-style */
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
type ArrayOfTuples = [ResourceId, number][];
const example: ArrayOfTuples = [
  [ResourceId.Clay, 50],
  [ResourceId.Timber, 20],
  // [ResourceId.Iron, 600],
];
const example2: ArrayOfTuples = [
  [ResourceId.Clay, 30],
  // [ResourceId.Timber, 10],
  [ResourceId.Iron, 230],
];
const example3 = {
  [ResourceId.Clay]: [ResourceId.Clay, 80],
  [ResourceId.Timber]: [ResourceId.Timber, 30],
  [ResourceId.Iron]: [ResourceId.Iron, 1650],
};

export interface Resources2 {
  timber: number;
  clay: number;
  iron: number;
}

type Sexample4 = {
  id: ResourceId,
  amount: number,
};
type Example4 = {
  [id in ResourceId]: {
    id: ResourceId,
    amount: number,
  };
};

const example4: Example4 = {
  [ResourceId.Clay]: {
    id: ResourceId.Clay,
    amount: 80,
  },
  [ResourceId.Timber]: {
    id: ResourceId.Timber,
    amount: 30,
  },
  [ResourceId.Iron]: {
    id: ResourceId.Iron,
    amount: 1650,
  },
};

const multi2 = (input: Example4, multi: number) => {
  return Object.values(input).reduce((accum, { id, amount }) => ({
    ...accum,
    [id]: { id, amount: amount * multi },
  }), input);
};

const add4v1 = (all: Example4, some: Partial<Example4>) => {
  return Object.values(all).reduce((accum, { id, amount }) => ({
    ...accum,
    [id]: { id, amount: amount + (some[id]?.amount ?? 0) },
  }), all);
};

const sub4 = (all: Example4, some: Partial<Example4>) => {
  return Object.values(all).reduce((accum, { id, amount }) => ({
    ...accum,
    [id]: { id, amount: amount - (some[id]?.amount ?? 0) },
  }), all);
};

const add4v2 = (all: Example4, some: Partial<Example4>) => {
  return Object.values(some).reduce((accum, obj) => {
    if (obj !== undefined) {
      const { id, amount } = obj;
      return ({
        ...accum,
        [id]: [id, (amount + all[id].amount)],
      });
    }
    return accum;
  }, all);
};

const addSingle = (all: Example4, { id, amount }: Sexample4): Example4 => ({
  ...all,
  [id]: {
    id,
    amount: all[id].amount + amount,
  },
});

// console.log("lol???");
// console.log(addSingle(example4, example4.clay));

// console.log(example4);
// console.log(multi2(example4));
// console.log("derp");
console.log(add4v2(example4, {
  [ResourceId.Clay]: {
    id: ResourceId.Clay,
    amount: 8044400,
  },
}));
console.log(add4v2(example4, {
  [ResourceId.Timber]: {
    id: ResourceId.Timber,
    amount: 4000,
  },
}));

// type Something = [resArray1: ResArray, resArray2: ResArray];

const addResourceArrays = (resArray1: ArrayOfTuples, resArray2: ArrayOfTuples): ArrayOfTuples => {
  const merged = [...resArray1, ...resArray2];
  const testMap: ResMap = new Map([]);

  merged.forEach(([resId, amount]) => {
    testMap.set(resId, (testMap.get(resId) ?? 0) + amount);
  });
  return Array.from(testMap.entries());
};

const multiplyResourcesArray = (resArray: ArrayOfTuples, multi: number): ArrayOfTuples => resArray.map(([id, amt]) => ([id, amt * multi]));

/**
 * * assumptions, townResources will have enough to be removed from
 * * both arrays won't contain "all" types of resource but array1 should have all of array2
 * * if not we can check it in this method but I think we should check it before it ever reaches here
 *
 * * maybe index the arrays somehow so we know which resource is in what index
 * * letting us only loop over each array once instead of however many resources there are
 *  */
export const subResources = (townResources: ArrayOfTuples, resourcesToSub: ArrayOfTuples): ArrayOfTuples => {
  return townResources.map(([resourceId, amount]) => {
    const index = resourcesToSub.findIndex(([townResource, _]) => townResource === resourceId); // ? cache this later

    if (index === -1) {
      // ? Nothing to subtract from this resource so just return the original amount
      console.warn(`[subResources] No resource found: ${resourceId}`);
      return [resourceId, amount];
    }

    const [, amountToRemove] = resourcesToSub[index];

    return [resourceId, amount - amountToRemove];
  });
};

console.log("@@@@@@@@@@@@@@@@@@@@@@@");
console.log(subResources(example, example2));

// console.log(addResourceArrays(example, example2));
// console.log(multiplyResources(example, 50));

const keyValueObjArray = [
  { key: ResourceId.Clay, val: 30 },
  { key: ResourceId.Timber, val: 30 },
  { key: ResourceId.Iron, val: 30 },
];

const keyValueMap = keyValueObjArray.reduce((mapAccumulator, obj) => {
  // either one of the following syntax works
  // mapAccumulator[obj.key] = obj.val;
  mapAccumulator.set(obj.key, obj.val);

  return mapAccumulator;
}, new Map<ResourceId, number>());

type Example5 = {
  [id in ResourceId]: [ResourceId, number];
};

const example5: Example5 = {
  [ResourceId.Clay]: [ResourceId.Clay, 80],
  [ResourceId.Iron]: [ResourceId.Iron, 1650],
  [ResourceId.Timber]: [ResourceId.Timber, 30],
};

const multi5 = (input: Example5, multi: number): Example5 => {
  return Object.values(input).reduce((accum, [id, amount]) => ({
    ...accum,
    [id]: [id, amount * multi],
  }), input);
};

const add5 = (all: Example5, some: Partial<Example5>) => {
  return Object.values(some).reduce((accum, tup) => {
    if (tup !== undefined) {
      const [id, amount] = tup;
      return ({
        ...accum,
        [id]: [id, (amount + all[id][1])],
      });
    }
    return accum;
  }, all);
};

// console.log(multi5(example5, 5));
type Test = Record<ResourceId, number>;
const example6: Test | Resources = {
  timber: 500,
  clay: 500,
  iron: 500,
};
const example7: Partial<Resources> = {
  iron: 500,
};

type RequireAtLeastOne<T> = { [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>; }[keyof T];

const add6 = (all: Resources, some: Partial<Resources>) => {
  // ?? an objects keys are not typesafe
  // we have "all" that has every res. It can't be undefined
  // "some" has none, some or all. It can be undefined
  // logically should loop over "some"
  // can't really know the types of "some" due to undefined
  // [ResourceId, number][]
  // (Object.keys(v) as Array<keyof typeof v>)
  const x = (Object.entries(some)).reduce((prev, curr) => {
    // curr as [ResourceId, number | undefined];
    if (curr !== undefined) {
      return prev;
    }
    return prev;
  }, all);
};

// console.log(add6(example6, { clay: 24 }));

type Resources3 = Record<ResourceId, number>;

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

const multiplyResources = (resourceCost: Resources, multiplier: number) => {
  return Object.values(ResourceId).reduce((accum, resource) => ({
    ...accum,
    [resource]: (resourceCost[resource] * multiplier),
  }), resourceCost);
};

console.log(multiplyResources(example6, 0));
console.log(multiplyResources(example6, 1));
console.log(multiplyResources(example6, 5));
console.log(multiplyResources(example6, 10));

const resources1: Partial<Resources3> = {
  [ResourceId.Clay]: 5,
};

const resources2: Partial<Resources3> = {
  [ResourceId.Clay]: 1,
  [ResourceId.Iron]: 3,
};

const resourceSum = addRecords(resources1, resources2);
console.log(resourceSum);

function addRecords2(all: Partial<Resources3>, modification: Partial<Resources3>) {
  const allCopy = { ...all };
  // eslint-disable-next-line no-restricted-syntax
  for (const key of Object.values(ResourceId)) {
    allCopy[key as ResourceId] = (modification[key as ResourceId] ?? 0) + (all[key as ResourceId] ?? 0);
  }

  return allCopy;
}

const resourceSum2 = addRecords2(resources1, resources2);
console.log(resourceSum2);
