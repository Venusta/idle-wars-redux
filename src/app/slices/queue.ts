import { createSlice } from "@reduxjs/toolkit";
import { BuildingId } from "../game/constants";

interface QueueItem {
    item: number;
    completionTime: number;
}

interface Queue {
  townId: number
  [x in BuildingId]: QueueItem
}



const initialState = [
  { // town 1
    townId: 0,
    barracks: [
      { item: 0, completionTime: 5938973 },
      { item: 0, completionTime: 593894473 }
    ],
    stable: [
    ],
    headquarters: [
    ]
  },
  { // town 2
    townId: 1,
    barracks: [
    ],
    stable: [
    ],
    headquarters: [
    ]
  }
]

interface QueuePayload {
  payload: {
    townId: number
    buildingId: number
    item: number
    completionTime: number
  }
}

export const queueSlice = createSlice({
  name: "queue",
  initialState,
  reducers: {
    createQueue: (state, { payload: { townId, buildingId, item, completionTime } }: QueuePayload) => {
    },
  },
});

export const {
  createQueue,
} = queueSlice.actions;
