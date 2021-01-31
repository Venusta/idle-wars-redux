import { createSlice } from "@reduxjs/toolkit";
import { Resources, Town } from "../../types/types";
import { selectTown } from "../selectors";
import { selectBuilding } from "../selectors/selectBuilding";
import { BuildingId } from "../game/constants";
import { getBuildingData } from "../game/buildings"

// const initialState: Town[] = [
//   {
//     resources: {
//       timber: 500,
//       clay: 500,
//       iron: 500,
//     },
//     population: 0,
//     buildings: [
//       {
//         buildingId: BuildingId.TimberCamp,
//         level: 0,
//       },
//       {
//         buildingId: BuildingId.ClayPit,
//         level: 0,
//       },
//       {
//         buildingId: BuildingId.IronMine,
//         level: 0,
//       }
//     ]
//   }
// ];


const initialState: Town[] = [
  {
    resources: {
      timber: 500,
      clay: 500,
      iron: 500,
    },
    population: 0,
    buildings: {
      [BuildingId.TimberCamp]: {
        buildingId: BuildingId.TimberCamp,
        level: 0,
      },
      [BuildingId.ClayPit]: {
        buildingId: BuildingId.ClayPit,
        level: 0,
      },
      [BuildingId.IronMine]: {
        buildingId: BuildingId.IronMine,
        level: 0,
      },
      [BuildingId.Headquarters]: {
        buildingId: BuildingId.Headquarters,
        level: 0,
      },
      [BuildingId.Barracks]: {
        buildingId: BuildingId.Barracks,
        level: 0,
      },
      [BuildingId.Headquarters]: {
        buildingId: BuildingId.Headquarters,
        level: 0,
      },
    },
    buildingKeys: [ BuildingId.TimberCamp, BuildingId.ClayPit, BuildingId.IronMine]
  }
];

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
      const town = selectTown({ towns}, townId);      
      const buildingData = getBuildingData(buildingId);
      const cost = buildingData!.getCost(building.level);
      
      // if (resources.isEnough) { 
      building.level += 1;
      for (const [k, v] of Object.entries(cost)) {
        town.resources[k as keyof Resources] -= v;
      }
      // }
    }
  },
});

export const {
  createTown,
  constructBuilding,
} = townSlice.actions;
