/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-classes-per-file */
/* eslint-disable arrow-body-style */
import { Resources, ResourceTuple } from "../../types/types";
import { ResourceId, UnitId } from "./constants";
import { Unit } from "./model/unit";

type ResMap = Map<ResourceId, number>;

export const addResourceArrays = (arrayOfResources: Resources[]): Resources => {
  const testMap: ResMap = new Map([]);
  arrayOfResources.flat().forEach(([resId, amount]) => {
    testMap.set(resId, (testMap.get(resId) ?? 0) + amount);
  });
  return Array.from(testMap.entries());
};

export const multiplyResourcesArray = (resArray: Resources, multi: number): Resources => resArray.map(([id, amt]) => ([id, amt * multi]));

/**
 * * assumptions, townResources will have enough to be removed from
 * * both arrays won't contain "all" types of resource but array1 should have all of array2
 * * if not we can check it in this method but I think we should check it before it ever reaches here
 *
 * * maybe index the arrays somehow so we know which resource is in what index
 * * letting us only loop over each array once instead of however many resources there are
 *  */
export const subResources = (townResources: Resources, resourcesToSub: Resources): Resources => {
  return townResources.map(([resourceId, amount]) => {
    const index = resourcesToSub.findIndex(([townResource]) => townResource === resourceId); // ? cache this later

    if (index === -1) {
      // ? Nothing to subtract from this resource so just return the original amount
      // console.warn(`[subResources] No resource found: ${resourceId}`);
      return [resourceId, amount];
    }

    const [, amountToRemove] = resourcesToSub[index];

    return [resourceId, amount - amountToRemove];
  });
};
const getKeys = Object.keys as <T extends Record<string, unknown>>(obj: T) => Array<keyof T>;

type RequireSome<T, K extends keyof T> = Required<Pick<T, K>> & T;

type ResList = {
  [id in ResourceId]?: number
};

type UnitList = {
  [id in UnitId]?: number
};

type ShitList2<T extends string> = Partial<Record<T, number>>;

type ShitList3<T> = Partial<Record<keyof T, number>>;

const resources: ResList = {
  [ResourceId.Timber]: 500,
  [ResourceId.Clay]: 500,
  [ResourceId.Iron]: 500,
};

function getKeysSafer<O = ResList | UnitList>(Obj: O) {
  return Object.keys(Obj) as Extract<keyof O, string>[];
}

// console.log(getKeysSafer<ResList>(resources));

class CustomMap<O = ResList | UnitList> {
  private obj: O;

  constructor(obj: O) {
    this.obj = obj;
    console.log(obj);
  }

  getValue = <Key extends keyof O>(key: Key) => {
    return this.obj[key] ?? 0;
  };

  keyExists = <Key extends keyof O>(key: Key): boolean => {
    const index = Object.keys(this.obj).findIndex((k) => k === key);
    return index !== undefined;
  };

  getKeys = (): Extract<keyof O, string>[] => {
    return Object.keys(this.obj) as Extract<keyof O, string>[];
  };

  get = () => {
    return this.obj;
  };

  set = <Key extends keyof O>(key: Key, value: number) => {
    this.obj = {
      ...this.obj,
      [key]: value,
    };
  };
}

// const x = new CustomMap(resources);
// console.log(x.getValue(ResourceId.Timber));
// console.log(x.keyExists(ResourceId.Timber));
// console.log(x.getKeys());
// console.log(x.get());
// x.set(ResourceId.Timber, 45000);
// console.log(x.get());

const resources2: Resources = [
  [ResourceId.Timber, 500],
  [ResourceId.Clay, 500],
  [ResourceId.Iron, 500],
];

// export type ResourceTuple = [ResourceId, number];
// export type Resources = ResourceTuple[];

// class CustomArray<ArrayOfTuples = [ResourceId, number][]> {
//   thing: ArrayOfTuples;

//   constructor(thing: ArrayOfTuples) {
//     this.thing = thing;
//     console.log(thing);
//   }

//   getKeyIndex = <Key extends ResourceId>(key: Key): number => {
//     const y = this.thing;
//     return this.thing.findIndex(([id]) => id === key);
//   };

//   getValue = (key: ResourceId) => {
//     const index = this.getKeyIndex(key);
//     return (index !== -1) ? this.thing[index][1] : undefined;
//   };

//   get = () => {
//     return this.thing;
//   };

//   getKeys = () => {
//     return this.thing.map(([key]) => key);
//   };

//   set = (key: ResourceId, value: number) => {
//     const index = this.getKeyIndex(key);
//     if (index !== -1) {
//       this.thing.splice(index, 1, [key, value]);
//     }
//   };
// }

// const y = new CustomArray(resources2);
// console.log(y.getKeyIndex(ResourceId.Timber));
// console.log(y.getValue(ResourceId.Timber));
// console.log(y.getKeys());
// console.log(y.get());
// y.set(ResourceId.Timber, 9000);
// console.log(y.get());
