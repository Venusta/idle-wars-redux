import { createSlice } from "@reduxjs/toolkit";
import { Cost, Resources, Towns } from "../../types/types";
import { baseBuildings } from "../game/buildings";
import { BuildingId, UnitId } from "../game/constants";
import { isResourceId } from "../game/utility";

const initialState: Towns = {
  "0": {
    // id
    // coords
    // name?
    resources: {
      timber: 500,
      clay: 500,
      iron: 500,
    },
    population: 400,
    maxPopulation: 900,
    storageCapacity: 20000,
    unlocked: { // units / buildings maybe
      [UnitId.SpearFighter]: 1,
      [UnitId.Swordsman]: 0,
      [UnitId.Axeman]: 0,
    },
    units: {
      [UnitId.SpearFighter]: {
        town: 100,
        total: 200,
      },
      [UnitId.Swordsman]: {
        town: 200,
        total: 200,
      },
    },
    buildings: {
      [BuildingId.TimberCamp]: {
        id: BuildingId.TimberCamp,
        level: 0,
        queuedLevel: 0,
      },
      [BuildingId.ClayPit]: {
        id: BuildingId.ClayPit,
        level: 6,
        queuedLevel: 6,
      },
      [BuildingId.IronMine]: {
        id: BuildingId.IronMine,
        level: 0,
        queuedLevel: 0,
      },
      [BuildingId.Headquarters]: {
        id: BuildingId.Headquarters,
        level: 20,
        queuedLevel: 20,
      },
      [BuildingId.Barracks]: {
        id: BuildingId.Barracks,
        level: 15,
        queuedLevel: 15,
      },
      [BuildingId.Stable]: {
        id: BuildingId.Stable,
        level: 0,
        queuedLevel: 0,
      },
    },
  }
};


interface ChangeResourcesPayload {
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

    addResources: (towns, { payload: { townId, resources } }: ChangeResourcesPayload) => {
      const town = towns[townId]
      for (const [k, v] of Object.entries(resources)) {
        if (isResourceId(k)) town.resources[k] += v;
      }
    },

    removeResources: (towns, { payload: { townId, resources } }: ChangeResourcesPayload) => {
      const town = towns[townId]
      for (const [k, v] of Object.entries(resources)) {
        if (isResourceId(k)) town.resources[k] -= v;
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
      const cost: Cost = baseBuildings[buildingId].getCost(building.queuedLevel);

      // Check if there is enough resources + population
      // Check if any building/research requirements are met

      for (const [k, v] of Object.entries(cost.resources)) {
        if (isResourceId(k)) town.resources[k] -= v;
        // TODO FIX THIS URGENT
      }
      building.queuedLevel += 1;
      town.population += cost.population || 0;
    },
  },
});

export const {
  createTown,
  addResources,
  removeResources,
  increasePopulation,
  incrementActualBuildingLevel,
  incrementQueuedBuildingLevel,
  startBuildSomething,
} = townSlice.actions;
