import { createSlice } from "@reduxjs/toolkit";
import { Resources, Towns } from "../../types/types";
import { BuildingId } from "../game/constants";
import { buildings } from "../game/buildings";

const initialState: Towns = { 
  // TODO make this an object and index them by id
  "0": {
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
        queuedLevel: 0,
      },
      [BuildingId.ClayPit]: {
        buildingId: BuildingId.ClayPit,
        level: 0,
        queuedLevel: 0,
      },
      [BuildingId.IronMine]: {
        buildingId: BuildingId.IronMine,
        level: 0,
        queuedLevel: 0,
      },
      [BuildingId.Headquarters]: {
        buildingId: BuildingId.Headquarters,
        level: 0,
        queuedLevel: 0,
      },
      [BuildingId.Barracks]: {
        buildingId: BuildingId.Barracks,
        level: 0,
        queuedLevel: 0,
      },
      [BuildingId.Stable]: {
        buildingId: BuildingId.Stable,
        level: 0,
        queuedLevel: 0,
      },
    },
    // keys: [BuildingId.TimberCamp, BuildingId.ClayPit, BuildingId.IronMine]
  }
};

interface constructBuildingPayload {
  payload: {
    townId: string
    buildingId: BuildingId,
  }
}

interface removeResourcesPayload {
  payload: {
    townId: string;
    resources: Resources;
  }
}

export const townSlice = createSlice({
  name: "town",
  initialState,
  reducers: {
    createTown: (state, { payload }: { payload: any }) => {
    },

    removeResources: (towns, { payload: { townId, resources } }: removeResourcesPayload) => {
      const town = towns[townId]
      for (const [k, v] of Object.entries(resources)) {
        town.resources[k as keyof Resources] -= v;
      }
    },

    increasePopulation: (towns, { payload: { townId, value } }: { payload: { townId: string, value: number } } ) => {
      const town = towns[townId];
      town.population += value;
    },

    incrementActualBuildingLevel: (towns, { payload: { townId, buildingId } }: { payload: { townId: string, buildingId: BuildingId } } ) => {
      const town = towns[townId];
      town.buildings[buildingId].level += 1;
    },

    incrementQueuedBuildingLevel: (towns, { payload: { townId, buildingId } }: { payload: { townId: string, buildingId: BuildingId } } ) => {
      const town = towns[townId];
      town.buildings[buildingId].queuedLevel += 1;
    },
  },
});

export const {
  createTown,
  removeResources,
  increasePopulation,
  incrementActualBuildingLevel,
  incrementQueuedBuildingLevel
} = townSlice.actions;
