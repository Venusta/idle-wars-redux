import { createSlice } from "@reduxjs/toolkit";
import { Resources, Town } from "../../types/types";
import { BuildingId } from "../game/constants";
import { buildings } from "../game/buildings";

const initialState: Town[] = [ 
  // TODO make this an object and index them by id
  {
    // id
    // coords
    // name?
    resources: {
      timber: 500,
      clay: 500,
      iron: 500,
    },
    population: 0,
    maxPopulation: 5600,
    storageCapacity: 20000,
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
      [BuildingId.Stable]: {
        buildingId: BuildingId.Stable,
        level: 0,
      },
    },
    // keys: [BuildingId.TimberCamp, BuildingId.ClayPit, BuildingId.IronMine]
  }
];

interface constructBuildingPayload {
  payload: {
    townId: number
    buildingId: BuildingId,
  }
}

export const townSlice = createSlice({
  name: "town",
  initialState,
  reducers: {
    createTown: (state, { payload }: { payload: any }) => {
    },

    constructBuilding: (towns, { payload: { townId, buildingId } }: constructBuildingPayload) => {
      const town = towns[townId]
      const building = town.buildings[buildingId]
      const cost = buildings[buildingId].getCost(building.level);
      // TODO check cost 
      // TODO check pop
      // TODO check requirements
      // building.level += 1;
      for (const [k, v] of Object.entries(cost.resources)) {
        town.resources[k as keyof Resources] -= v;
      }
      town.population += cost.population;
    }
  },
});

export const {
  createTown,
  constructBuilding,
} = townSlice.actions;
