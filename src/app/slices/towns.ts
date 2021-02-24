/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { BuildingCost, Resources, TownsInterface, TownInterface } from "../../types/types";
import { baseBuildings } from "../game/buildings";
import { BuildingId, UnitId, ResourceId } from "../game/constants";
import { isResourceId, isBuildingId, hasRequirements } from "../game/utility";
import { ResourceBuilding } from "../game/model/resourceBuilding";
import { Town } from "../game/model/town";
import { miscSlice } from "./misc";

const testTown2 = new Town("0", "test123", { timber: 500, clay: 500, iron: 500 });
testTown2.setBuildingLevel(BuildingId.ClayPit, 6);
testTown2.setBuildingLevel(BuildingId.IronMine, 30);
testTown2.setBuildingLevel(BuildingId.Barracks, 15);
testTown2.setBuildingLevel(BuildingId.Headquarters, 20);
// testTown2.addArmy({ [UnitId.SpearFighter]: 10, [UnitId.Archer]: 20, [UnitId.SpearFighter]: 15 });

testTown2.addUnit(UnitId.Swordsman, 70)
testTown2.addUnit(UnitId.Archer, 99999940)
testTown2.addUnit(UnitId.Scout, 940)

console.log(testTown2.toRedux().units);

const testTown: TownInterface = {
  id: "0",
  // coords
  name: "Test village",
  resources: {
    timber: 5000,
    clay: 5000,
    iron: 5000,
  },
  rps: {
    timber: 0,
    clay: 0,
    iron: 0,
  },
  queues: {
    // [BuildingId.Headquarters]: [],
    // [BuildingId.Barracks]: [],
    // [BuildingId.Stable]: [],
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
      level: 30,
      queuedLevel: 30,
    },
    [BuildingId.Headquarters]: {
      id: BuildingId.Headquarters,
      level: 23,
      queuedLevel: 23,
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


/*
* Start: 
* units are removed from town
* Return: 
* Dead are removed from town & total
* Haul is added to resources
*/
const example2 = { // maybe replacement for example.units
  unitsTown: {
    [UnitId.SpearFighter]: 100,
    [UnitId.Swordsman]: 200,
  },
  unitsTotal: {
    [UnitId.SpearFighter]: 200,
    [UnitId.Swordsman]: 200,
  },
}

const example = {
  units: { // 
    [UnitId.SpearFighter]: {
      town: 100,
      total: 200,
    },
    [UnitId.Swordsman]: {
      town: 200,
      total: 200,
    },
  },
  raids: [ // raid return payload
    { // raid 0 of multiple
      townId: "rfubdfgdfg",
      battleTime: "Feb 13, 2021 18:15:52",
      units: {
        [UnitId.SpearFighter]: 50,
        [UnitId.Swordsman]: 100,
      },
      deadAttacker: { // gets set at the battle not before
        [UnitId.SpearFighter]: 4,
      },
      deadDefender: {

      },
      haul: { // gets set at the battle not before
        timber: 0,
        clay: 20,
        iron: 30,
      },
      resources: {},
      buildings: {},
      armyInVillage: {},
      armyOutsideVillage: {},
    }
  ]
}

const outGoingRaid = { // raid outgoing payload
  townId: "rfubdfgdfg",
  battleTime: "Feb 13, 2021 18:15:52",
  units: {
    [UnitId.SpearFighter]: 50,
    [UnitId.Swordsman]: 100,
  },
}

const startingRps = (towns: TownsInterface): TownsInterface => { // TODO fix this shit aids fuck cancer
  const newTowns = { ...towns };
  Object.entries(newTowns).forEach(([townId, town]) => {
    Object.values(town.buildings).forEach(({ id, level }) => {
      const buildingData = baseBuildings[id];

      if (buildingData instanceof ResourceBuilding) {
        const newResourcesPerSecond = buildingData.getResourceGeneration(level);
        buildingData.creates.forEach((resource) => {
          newTowns[townId].rps[resource] += newResourcesPerSecond;
          // console.log(`Adding: ${newResourcesPerSecond}`);
          // console.log(`${resource} for ${townId} is now ${newTowns[townId].rps[resource]} per second`);
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
  },
  "2": {
    ...testTown,
    id: "2",
    name: "Barbarian village",
    units: {
      [UnitId.SpearFighter]: {
        town: 15,
        total: 15
      }
    }
  }
};


interface ChangeResourcesPayload {
  payload: {
    townId: string;
    resources: Resources;
  }
};

interface StartBuildSomethingPayload {
  payload: {
    townId: string;
    buildingId: BuildingId;
    queueBuildingId: BuildingId;
    amount?: number;
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

    incrementAllTownsResources: (towns, { payload: { msPassed } }: { payload: { msPassed: number } }) => { // cant be here
      Object.entries(towns).forEach(([townId, town]) => {
        Object.values(town.buildings).forEach((building) => {
          const buildingData = baseBuildings[building.id];
          if (buildingData instanceof ResourceBuilding) {
            buildingData.creates.forEach((resource) => {
              towns[townId].resources[resource] += towns[townId].rps[resource] / 1000 * msPassed;
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

    startBuildSomething: (towns, { payload: { townId, buildingId, queueBuildingId, amount = 1 } }: StartBuildSomethingPayload) => {
      const town = towns[townId];
      const building = town.buildings[buildingId]
      const queueBuilding = town.buildings[queueBuildingId];
      const cost: BuildingCost = baseBuildings[buildingId].getCost(building.queuedLevel);
      const buildTimeMs = baseBuildings[buildingId].getBuildTime(building.queuedLevel, queueBuilding.queuedLevel) * 1000;

      // ✔ Check if there is enough resources + population
      // ✖ Check if any building / research requirements are met

      if (hasRequirements(town.maxPopulation, town.population, town.resources, cost)) {

        Object.values(ResourceId).forEach((key) => {
          town.resources[key] -= cost.resources[key];
        })

        building.queuedLevel += 1;
        town.population += cost.population ?? 0;

        const buildingQueue = town.queues[queueBuildingId];
        if (buildingQueue !== undefined) {
          const queueLength = buildingQueue.length;
          let completionTime;
          if (queueLength === 0) {
            completionTime = Date.now() + buildTimeMs;
          } else {
            completionTime = buildingQueue[queueLength - 1].completionTime + buildTimeMs;
          }
          const qItem = { item: buildingId, level: building.queuedLevel, duration: buildTimeMs, completionTime, amount }
          buildingQueue.push(qItem);
        } else {
          console.error(`No queue exists for building ${queueBuildingId} in town ${townId}, attempting to create it`);
          town.queues = {
            ...town.queues,
            [queueBuildingId]: [
              { item: buildingId, level: building.queuedLevel, duration: buildTimeMs, completionTime: Date.now() + buildTimeMs, amount }
            ]
          }
        };
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(miscSlice.actions.tick, (towns, { payload }) => {
      console.log("Processed tick in town slice!");
      console.log(payload);

      Object.values(towns).forEach((town) => {

        Object.values(ResourceId).forEach((key) => {
          town.resources[key] += town.rps[key] / 1000 * payload.difference
          // console.log(`Town: ${town.id} - Adding ${key}: ${town.rps[key] / 1000 * payload.difference}`);
        })

        // * check queues
        // * check battles (queue also) 

        Object.values(town.queues).forEach((buildingQueue) => {
          buildingQueue?.forEach((queueItem, index) => {
            if (Date.now() > queueItem.completionTime) {
              if (isBuildingId(queueItem.item)) {
                // Remove finished building from queue
                buildingQueue?.splice(index, 1);

                // Update resource generation if the constructed building was a resource generation building
                const building = town.buildings[queueItem.item];
                const buildingData = baseBuildings[queueItem.item];
                if (buildingData instanceof ResourceBuilding) {
                  const newResourcesPerSecond = buildingData.getResourceGeneration(building.level + 1);
                  const oldResourcesPerSecond = buildingData.getResourceGeneration(building.level);
                  buildingData.creates.forEach((resource) => {
                    town.rps[resource] += (newResourcesPerSecond - oldResourcesPerSecond);
                  });
                };

                // Increment level
                building.level += 1;
              } else {
                console.error(`${queueItem.item} was not a valid building id.`);
              }
            }
          });
        })

      });
    });
  }
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
