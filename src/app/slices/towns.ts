import { createSlice } from "@reduxjs/toolkit";
import { Resources, Town } from "../../types/types";
import { selectSomething } from "../selectors";
import { selectBuilding } from "../selectors/selectBuilding";

const initialState: Town[] = [
  {
    resources: {
      timber: 500,
      clay: 500,
      iron: 500,
    },
    population: 0,
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

export const resourceCost = (level = 1) => { // TODO move this
  level = level + 1
  const timber = 7 * level;
  const clay = 5 * level;
  const iron = 2 * level;
  // const population = -2;
  // const constructionTime = 50 * level

  return { timber, clay, iron }
};

export const populationCost = (level = 1) => {
  return 2 + level;
}

interface constructBuildingPayload {
  payload: {
    townId: number
    buildingId: number,
  }
}

export const townSlice = createSlice({
  name: "town",
  initialState,
  reducers: {
    createTown: (state, { payload }: { payload: any }) => {
    },

    constructBuilding: (towns, { payload: { townId, buildingId } }: constructBuildingPayload) => {
      const building = selectBuilding({ towns }, townId, buildingId);
      const something = selectSomething({ towns }, townId);

      const cost = resourceCost(building.level);

      // if (resources.isEnough) { 
      building.level += 1;
      something.population += populationCost(building.level);

      for (const [k, v] of Object.entries(cost)) {
        something.resources[k as keyof Resources] -= v;
      }
    }
  },
});

export const {
  createTown,
  constructBuilding,
} = townSlice.actions;
