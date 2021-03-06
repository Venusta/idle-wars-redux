/* eslint-disable arrow-body-style */
import { ResourceId } from "../game/constants";

type ResList = {
  [id in ResourceId]: {
    id: ResourceId,
    amount: number,
  }
};

interface Example1 {
  byId: ResList,
  allIds: ResourceId[]
}
export interface Example1P {
  byId: Partial<ResList>,
  allIds: ResourceId[]
}

export const ex1: Example1P = {
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

export const xxx = ex1.allIds;

const addProp = (obj: Example1P, key: ResourceId): Example1P => {
  return {
    ...obj,
    allIds: [...obj.allIds, key],
    byId: {
      ...obj.byId,
      [key]: {
        id: [key],
        amount: 0,
      },
    },
  };
};

export const addPartialResources = (p: Example1P[]): Example1P => {
  let newObj: Example1P = {
    allIds: [],
    byId: {},
  };
  p.forEach((resObj) => {
    resObj.allIds.forEach((id) => {
      const entry = resObj.byId[id];
      if (entry) {
        if (newObj.byId[id]) {
          newObj.byId[id] = {
            id,
            amount: (newObj.byId[id]?.amount ?? 0) + entry.amount,
          };
        } else {
          newObj = {
            allIds: [
              ...newObj.allIds,
              id,
            ],
            byId: {
              ...newObj.byId,
              [id]: { id, amount: entry.amount },
            },
          };
        }
      }
    });
  });
  return newObj;
};

// console.log(addPartials([ex1]));
// console.log(addPartials([ex1, ex1]));
// console.log(addPartials([ex1, ex1, ex1, ex1]));

// export const addPartials2 = (p: Example1P[]): Example1P => {
//   const x = p.reduce((previous, current) => {

//     const newObj = current.allIds.reduce((prev, id) => {
//       const entry = current.byId[id];
//       if (entry) {
//         if (previous.byId[id]) {
//           return {
//             allIds: [...previous.allIds],
//             byId: {
//               ...previous.byId,
//               [id]: { id, amount: (previous.byId[id]?.amount ?? 0) + entry.amount },
//             },
//           };
//         }
//         return {
//           allIds: [
//             ...previous.allIds,
//             id,
//           ],
//           byId: {
//             ...previous.byId,
//             [id]: { id, amount: entry.amount },
//           },
//         };
//       }
//     }, current);

//     return {
//       ...previous,
//       // byId: newById

//     };
//   },
//   {
//     allIds: [],
//     byId: {},
//   });

//   return x;
// };

// console.log(addPartials2([]));
// console.log(addPartials2([ex1]));
// console.log(addPartials2([ex1, ex1]));
// console.log(addPartials2([ex1, ex1, ex1, ex1]));
