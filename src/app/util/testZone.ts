/* eslint-disable arrow-body-style */
import { ResourceId } from "../game/constants";

type Resources4 = Record<ResourceId, number>;

type ResList = {
  [id in ResourceId]: number
};

export interface Res extends ResList {
  ids: ResourceId[]
}
/**
 * Make all properties ResList optional
 */
export interface Res2 extends Partial<ResList> {
  ids: ResourceId[]
}
const Resources = {
  [ResourceId.Timber]: 500,
  [ResourceId.Clay]: 500,
  [ResourceId.Iron]: 500,
};

const Resources2 = {
  byId: {
    [ResourceId.Timber]: {
      id: ResourceId.Timber,
      amount: 500,
    },
    [ResourceId.Clay]: {
      id: ResourceId.Clay,
      amount: 500,
    },
    [ResourceId.Iron]: {
      id: ResourceId.Iron,
      amount: 500,
    },
  },
  allIds: [
    ResourceId.Timber,
    ResourceId.Clay,
    ResourceId.Iron,
  ],
};

const resources3: Res = {
  [ResourceId.Timber]: 500,
  [ResourceId.Clay]: 500,
  [ResourceId.Iron]: 500,
  ids: [
    ResourceId.Timber,
    ResourceId.Clay,
    ResourceId.Iron,
  ],
};

export const y = resources3.ids.map((key) => resources3[key] * 50);
console.log(y);
export const z = resources3.ids.map((key) => ({ [key]: resources3[key] * 50 }));
console.log(z);

export const dfg = resources3.ids.reduce((prev, key) => {
  return {
    ...prev,
    [key]: resources3[key] * 20,
  };
}, resources3);
console.log(dfg);

const resources4: Res2 = {
  [ResourceId.Timber]: 500,
  [ResourceId.Clay]: 500,
  ids: [
    ResourceId.Timber,
    ResourceId.Clay,
  ],
};

// type AHHH<K> = {
//   [id in K]: number
// };

// interface IdsArrayOf<T> extends AHHH<K> {
//   ids: T[]
// }

// const addProp = <O extends IdsArrayOf<K>, K extends string>(obj: O, key: K): O => {
//   // const x = obj.ids.findIndex((k) => k === key);
//   if (obj[key]) return obj;
//   const x = obj[key];
//   return {
//     ...obj,
//     ids: [...obj.ids, key],
//     [key]: 0,
//   };
// };

// console.log(addProp<Res2, ResourceId>(resources4, ResourceId.Iron));
// console.log(addProp(resources4, ResourceId.Timber));
