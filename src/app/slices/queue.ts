import { createSlice } from "@reduxjs/toolkit";
import { BuildingId, UnitId } from "../game/constants";

export interface UnitQueueItem {
  item: UnitId;
  duration: number;
  completionTime: number;
  amount: number;
}

export interface BuildingQueueItem { // proper queue types, no shortcuts fuck you ???
  item: BuildingId;
  duration: number;
  completionTime: number;
  amount: number;
}

export interface Queue {
  [key: string]: {
    [id in BuildingId]?: BuildingQueueItem[];
  }
}

const initialState: Queue = {
  "0": {
    [BuildingId.Headquarters]: [
    ],
  },
  "1": {
    [BuildingId.Headquarters]: [],
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
    townId: string;
    buildingId: BuildingId;
    item: BuildingId;
    duration: number;
    amount?: number;
  }
}

interface PopPayload {
  payload: {
    townId: string;
    buildingId: BuildingId;
  }
}

export const queueSlice = createSlice({
  name: "queue",
  initialState,
  reducers: {
    enqueue: (queue, { payload: { townId, buildingId, item, duration, amount = 1 } }: QueuePayload) => {
      const townQueue = queue[townId];

      if (townQueue !== undefined) {
        const buildingQueue = townQueue[buildingId];
        if (buildingQueue !== undefined) {
          let completionTime;
          const queueLength = buildingQueue.length;

          if (queueLength === 0) {
            completionTime = Date.now() + duration * 1000;
          } else {
            completionTime = buildingQueue[queueLength - 1].completionTime + duration * 1000;
            console.log(`Queue done at: ${buildingQueue[queueLength - 1].completionTime} Added ${duration * 1000} seconds.`);
          }

          buildingQueue.push({ item, duration: duration * 1000, completionTime, amount });

        } else {
          //create it
        }
      }
    },
    pop: (queue, { payload: { townId, buildingId } }: PopPayload) => {
      //buildingIndex
      const x = queue[townId][buildingId]?.shift();

      console.log(`removing ${townId} ${buildingId}`);
      console.log(queue);

    },
    cancel: (queue, { payload }) => {
      // refund resources and shit
    },
  },
  // extraReducers: builder => {
  //   builder.addCase(townSlice.actions.startBuildSomething, (state, { payload }) => {
  //     console.log("Lets build!");
  //     console.log(payload);
  //     const { townId, buildingId } = payload

  //     const building = baseBuildings[buildingId];



  //     const constructionTime = building.getBuildTime(0, 1);
  //     // const constructionTime = building.getBuildTime(queuedLevel, 1);
  //     const payload2 = { townId, buildingId: 0, item: buildingId, duration: constructionTime }
  //     queueSlice.caseReducers.enqueue(state, { payload: payload2 })

  //   })
  // }
});

export const {
  enqueue,
  pop,
} = queueSlice.actions;
