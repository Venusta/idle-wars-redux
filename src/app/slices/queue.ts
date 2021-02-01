import { createSlice } from "@reduxjs/toolkit";
import { BuildingId } from "../game/constants";

interface QueueItem {
    item: number;
    completionTime: number;
    amount: number;
}

// export type Queue = {
//   [id in BuildingId]?: Array<QueueItem>;
// } & {
//   townId: number;
// };

export interface Queue {
  [key: string]: {
    [id in BuildingId]?: Array<QueueItem>
  }
}

const initialState: Queue = {
  "town Id": {
    [BuildingId.Barracks]: [
      { item: 0, completionTime: 5938973, amount: 1 },
      { item: 0, completionTime: 593894473, amount: 1 }
    ],
    [BuildingId.Stable]: [
      { item: 0, completionTime: 345345, amount: 1 }
    ],
  },
  "town Id 2": {
    [BuildingId.Barracks]: [
      { item: 0, completionTime: 5938973, amount: 1 },
      { item: 0, completionTime: 593894473, amount: 1 }
    ],
    [BuildingId.Stable]: [
      { item: 0, completionTime: 345345, amount: 1 }
    ],
  },
}

// const initialState: Queue[] = [
//   {
//     townId: 0,
//     [BuildingId.Barracks]: [
//       { item: 0, completionTime: 5938973, amount: 1 },
//       { item: 0, completionTime: 593894473, amount: 1 }
//     ],
//     [BuildingId.Stable]: [
//       //real queue won't have empty array
//     ],
//     [BuildingId.Headquarters]: [
//     ]
//   },
// ]

interface QueuePayload {
  payload: {
    townId: number
    buildingId: BuildingId
    item: number
    completionTime: number
    amount?: number
  }
}

export const queueSlice = createSlice({
  name: "queue",
  initialState,
  reducers: {
    enqueue: (state, { payload: { townId, buildingId, item, completionTime, amount = 1 } }: QueuePayload) => {
      const townQueue = state[townId];

      if (townQueue !== undefined) {
        const buildingQueue = townQueue[buildingId];
        if (buildingQueue !== undefined) {
          buildingQueue.push({ item, completionTime, amount });
          console.log("yeet");
          
        } else {
          //create it
        }
      }
    },
  },
});

export const {
  enqueue,
} = queueSlice.actions;
