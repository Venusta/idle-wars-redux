import { createSlice } from "@reduxjs/toolkit";
import { Town } from "../../types/types";

const initialState: Town[] = [
  {
    buildings: [
      {
        buildingType: 0,
        level: 0,
      },
      {
        buildingType: 1,
        level: 0,
      }
    ]
  }
];

export const townSlice = createSlice({
  name: "town",
  initialState,
  reducers: {
    createTown: (state, { payload }: { payload: any }) => {
    },
  },
});

export const {
  createTown,
} = townSlice.actions;
