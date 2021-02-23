import { createSlice } from "@reduxjs/toolkit";
import { BuildingId, UnitId } from "../game/constants";
import { updateQueue } from "../game/queue";
import { miscSlice } from "./misc";

export interface UnitQueueItem {
  item: UnitId;
  duration: number;
  completionTime: number;
  amount: number;
}

export interface BuildingQueueItem {
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
      // const x = queue[townId][buildingId]?.shift();

      console.log(`removing ${townId} ${buildingId}`);
      console.log(queue);

    },
    cancel: (queue, { payload }) => {
      // refund resources and shit
    },
  },
  extraReducers: builder => {
    builder.addCase(miscSlice.actions.tick, (state, { payload }) => {
      console.log("Processed tick in queue slice!");
      console.log(payload);      
      // updateQueue(state);
      
    })
  }
});

export const {
  enqueue,
  pop,
} = queueSlice.actions;
