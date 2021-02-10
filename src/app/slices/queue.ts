import { createSlice } from "@reduxjs/toolkit";
import { BuildingId, BuildingQueueId } from "../game/constants";

export interface QueueItem {
  item: string;
  duration: number;
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
    [id in BuildingQueueId]: Array<QueueItem>
  }
}

const initialState: Queue = {
  "0": {
    [BuildingQueueId.Headquarters]: [
      // { 
      //   item: 0,
      //   duration: 600,
      //   completionTime: 593896666666666,
      //   amount: 1,
      // },
      // { 
      //   item: 1,
      //   duration: 600,
      //   completionTime: 593896666666668,
      //   amount: 3,
      // }
    ],
  },
  "1": {
    [BuildingQueueId.Headquarters]: [],
  },
  // "22": {
  //   [BuildingId.Barracks]: [
  //     { item: 0, completionTime: 5938973, amount: 1 },
  //     { item: 0, completionTime: 593894473, amount: 1 }
  //   ],
  //   [BuildingId.Stable]: [
  //     { item: 0, completionTime: 345345, amount: 1 }
  //   ],
  // },
  // "33": {
  //   [BuildingId.Barracks]: [
  //     { item: 0, completionTime: 5938973, amount: 1 },
  //     { item: 0, completionTime: 593894473, amount: 1 }
  //   ],
  //   [BuildingId.Stable]: [
  //     { item: 0, completionTime: 345345, amount: 1 }
  //   ],
  // },
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
    buildingId: BuildingQueueId;
    item: string;
    duration: number;
    amount?: number;
  }
}

interface PopPayload {
  payload: {
    townId: string;
    buildingId: BuildingQueueId;
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
          console.log(buildingQueue);

        } else {
          //create it
        }
      }
    },
    pop: (queue, { payload: { townId, buildingId } }: PopPayload) => {
      //buildingIndex
      const x = queue[townId][buildingId]?.shift();
      console.log(x?.item);

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
