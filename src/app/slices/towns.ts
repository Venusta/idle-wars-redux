import { createSlice } from "@reduxjs/toolkit";
import { BuildingCost, Resources, TownsInterface } from "../../types/types";
import { baseBuildings } from "../game/buildings";
import { BuildingId, UnitId } from "../game/constants";
import { isResourceId } from "../game/utility";
import { ResourceBuilding } from "../game/model/resourceBuilding";


const testTown = {
  id: "0",
  // coords
  name: "Test village",
  resources: {
    timber: 500,
    clay: 500,
    iron: 500,
  },
  rps: {
    timber: 0,
    clay: 0,
    iron: 0,
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
      level: 23,
      queuedLevel: 23,
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
    [BuildingId.Farm]: {
      id: BuildingId.Farm,
      level: 0,
      queuedLevel: 0
    },
    [BuildingId.Warehouse]: {
      id: BuildingId.Warehouse,
      level: 0,
      queuedLevel: 0
    }
  },
}

const startingRps = (towns: TownsInterface): TownsInterface => {
  const newTowns = { ...towns }
  Object.entries(newTowns).forEach(([townId, town]) => {
    Object.values(town.buildings).forEach(({ id, level }) => {
      const buildingData = baseBuildings[id];

      if (buildingData instanceof ResourceBuilding) {
        const newResourcesPerSecond = buildingData.getResourceGeneration(level);
        buildingData.creates.forEach((resource) => {
          town.rps[resource] += newResourcesPerSecond;
          console.log(`Adding: ${newResourcesPerSecond}`);
          console.log(`${resource} is now ${town.rps[resource]} per second`);
        });
      };

    })
  })
  return newTowns;
}

const initialState: TownsInterface = {
  "0": testTown,
  "1": {
    ...testTown,
    id: "1",
    name: "Kora sucks",
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
  initialState: startingRps(initialState),
  reducers: {
    createTown: (state, { payload }: { payload: any }) => {
    },

    addResources: (towns, { payload: { townId, resources } }: ChangeResourcesPayload) => {
      const town = towns[townId]
      for (const [k, v] of Object.entries(resources)) {
        if (isResourceId(k)) town.resources[k] += v;
      }
    },

    incrementAllTownsResources: (towns) => {
      Object.entries(towns).forEach(([townId, town]) => {
        Object.values(town.buildings).forEach((building) => {
          const buildingData = baseBuildings[building.id];
          if (buildingData instanceof ResourceBuilding) {
            buildingData.creates.forEach((resource) => {
              towns[townId].resources[resource] += towns[townId].rps[resource];
            });
          };
        });
      })
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

    finishConstruction: (towns, { payload: { townId, buildingId } }: { payload: { townId: string, buildingId: BuildingId } }) => {
      const town = towns[townId];
      const buildingData = baseBuildings[buildingId];
      const building = town.buildings[buildingId]

      if (buildingData instanceof ResourceBuilding) {
        const newResourcesPerSecond = buildingData.getResourceGeneration(building.level + 1);
        const oldResourcesPerSecond = buildingData.getResourceGeneration(building.level);
        buildingData.creates.forEach((resource) => {
          town.rps[resource] += (newResourcesPerSecond - oldResourcesPerSecond);
        });
      };

      building.level += 1;
    },

    incrementQueuedBuildingLevel: (towns, { payload: { townId, buildingId } }: { payload: { townId: string, buildingId: BuildingId } }) => {
      const town = towns[townId];
      town.buildings[buildingId].queuedLevel += 1;
    },

    startBuildSomething: (towns, { payload: { townId, buildingId } }: StartBuildSomethingPayload) => {
      const town = towns[townId];
      const building = town.buildings[buildingId]
      const cost: BuildingCost = baseBuildings[buildingId].getCost(building.queuedLevel);

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
  finishConstruction,
  incrementQueuedBuildingLevel,
  startBuildSomething,
  incrementAllTownsResources,
} = townSlice.actions;
