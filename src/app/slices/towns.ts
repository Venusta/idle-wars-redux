import { createSlice } from "@reduxjs/toolkit";
import { Resources, Towns } from "../../types/types";
import { buildings } from "../game/buildings";
import { BuildingId } from "../game/constants";

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
  }
};


interface RemoveResourcesPayload {
  payload: {
    townId: string;
    resources: Resources;
  }
}

interface StartBuildSomethingPayload {
  payload: {
    townId: string,
    buildingId: BuildingId
  }
}

export const townSlice = createSlice({
  name: "town",
  initialState,
  reducers: {
    createTown: (state, { payload }: { payload: any }) => {
    },

    removeResources: (towns, { payload: { townId, resources } }: RemoveResourcesPayload) => {
      const town = towns[townId]
      for (const [k, v] of Object.entries(resources)) {
        town.resources[k as keyof Resources] -= v;
      }
    },

    increasePopulation: (towns, { payload: { townId, value } }: { payload: { townId: string, value: number } }) => {
      const town = towns[townId];
      town.population += value;
    },

    incrementActualBuildingLevel: (towns, { payload: { townId, buildingId } }: { payload: { townId: string, buildingId: BuildingId } }) => {
      const town = towns[townId];
      town.buildings[buildingId].level += 1;
    },

    incrementQueuedBuildingLevel: (towns, { payload: { townId, buildingId } }: { payload: { townId: string, buildingId: BuildingId } }) => {
      const town = towns[townId];
      town.buildings[buildingId].queuedLevel += 1;
    },
    startBuildSomething: (towns, { payload: { townId, buildingId } }: StartBuildSomethingPayload) => {
      const town = towns[townId];
      const building = town.buildings[buildingId]
      const cost = buildings[buildingId].getCost(building.queuedLevel);

    // Check if there is enough resources + population
    // Check if any building/research requirements are met

      for (const [k, v] of Object.entries(cost.resources)) {
        town.resources[k as keyof Resources] -= v;
      }
      building.queuedLevel += 1;
      town.population += cost.population;
    },
  },
});

export const {
  createTown,
  removeResources,
  increasePopulation,
  incrementActualBuildingLevel,
  incrementQueuedBuildingLevel,
  startBuildSomething,
} = townSlice.actions;
