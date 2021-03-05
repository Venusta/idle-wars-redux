/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  BuildingCost, Resources, TownsInterface, TownInterface,
} from "../../types/types";
import { baseBuildings } from "../game/buildings";
import { BuildingId, UnitId, ResourceId } from "../game/constants";
import { isBuildingId, hasRequirements } from "../game/utility";
import { ResourceBuilding } from "../game/model/resourceBuilding";
import { Town } from "../game/model/town";
import { miscSlice } from "./misc";
import { baseUnits } from "../game/units";
import { addResourceArrays, subResources } from "../game/manipulationUtils";

const testTown2 = new Town("0", "test123", [[ResourceId.Timber, 500], [ResourceId.Clay, 500], [ResourceId.Iron, 500]]);
testTown2.setBuildingLevel(BuildingId.ClayPit, 6);
testTown2.setBuildingLevel(BuildingId.IronMine, 30);
testTown2.setBuildingLevel(BuildingId.Barracks, 15);
testTown2.setBuildingLevel(BuildingId.Headquarters, 20);
// testTown2.addArmy({ [UnitId.SpearFighter]: 10, [UnitId.Archer]: 20, [UnitId.SpearFighter]: 15 });

testTown2.addUnit(UnitId.Swordsman, 70);
testTown2.addUnit(UnitId.Archer, 99999940);
testTown2.addUnit(UnitId.Scout, 940);

console.log(testTown2.toRedux().units);

const testTown: TownInterface = {
  id: "0",
  // coords
  name: "Test village",
  resources: [
    [ResourceId.Timber, 500],
    [ResourceId.Clay, 500],
    [ResourceId.Iron, 500],
  ],
  rps: [
    [ResourceId.Timber, 1],
    [ResourceId.Clay, 1],
    [ResourceId.Iron, 1],
  ],
  queues: {
    buildings: {
      // [BuildingId.Headquarters]: [],
      // [BuildingId.Barracks]: [],
      // [BuildingId.Stable]: [],
    },
    units: {},
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
      queuedLevel: 0,
    },
    [BuildingId.Warehouse]: {
      id: BuildingId.Warehouse,
      level: 0,
      queuedLevel: 0,
    },
    [BuildingId.Smithy]: {
      id: BuildingId.Smithy,
      level: 0,
      queuedLevel: 0,
    },
  },
};

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
};

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
    },
  ],
};

const outGoingRaid = { // raid outgoing payload
  townId: "rfubdfgdfg",
  battleTime: "Feb 13, 2021 18:15:52",
  units: {
    [UnitId.SpearFighter]: 50,
    [UnitId.Swordsman]: 100,
  },
};

// const startingRps = (towns: TownsInterface): TownsInterface => { // TODO fix this shit aids fuck cancer
//   const newTowns = { ...towns };
//   Object.entries(newTowns).forEach(([townId, town]) => {
//     Object.values(town.buildings).forEach(({ id, level }) => {
//       const buildingData = baseBuildings[id];

//       if (buildingData instanceof ResourceBuilding) {
//         const newResourcesPerSecond = buildingData.getResourceGeneration(level);
//         buildingData.creates.forEach((resource) => {
//           newTowns[townId].rps[resource] += newResourcesPerSecond;
//           // console.log(`Adding: ${newResourcesPerSecond}`);
//           // console.log(`${resource} for ${townId} is now ${newTowns[townId].rps[resource]} per second`);
//         });
//       }
//     });
//   });
//   return newTowns;
// };

const initialState: TownsInterface = {
  0: testTown,
  1: {
    ...testTown,
    id: "1",
    name: "Kora sucks",
  },
  2: {
    ...testTown,
    id: "2",
    name: "Barbarian village",
    units: {
      [UnitId.SpearFighter]: {
        town: 15,
        total: 15,
      },
    },
  },
};

interface ChangeResourcesPayload {
  townId: string;
  resources: Resources;
}

interface StartBuildSomethingPayload {
  payload: {
    townId: string;
    buildingId: BuildingId;
    queueBuildingId: BuildingId;
  }
}

interface StartRecruitSomethingPayload {
  payload: {
    townId: string;
    unitId: UnitId;
    queueBuildingId: BuildingId;
    amount: number;
  }
}

export const townSlice = createSlice({
  name: "town",
  // initialState: startingRps(initialState),
  initialState,
  reducers: {
    createTown: (state, { payload }: { payload: unknown }) => {
    },

    addResources: (towns, { payload: { townId, resources } }: PayloadAction<ChangeResourcesPayload>) => {
      const town = towns[townId];
      town.resources = addResourceArrays([town.resources, resources]);
    },

    // incrementAllTownsResources: (towns, { payload: { msPassed } }: { payload: { msPassed: number } }) => { // cant be here
    //   Object.entries(towns).forEach(([townId, town]) => {
    //     Object.values(town.buildings).forEach((building) => {
    //       const buildingData = baseBuildings[building.id];
    //       if (buildingData instanceof ResourceBuilding) {
    //         buildingData.creates.forEach((resource) => {
    //           towns[townId].resources[resource] += (towns[townId].rps[resource] / 1000) * msPassed;
    //         });
    //       }
    //     });
    //   });
    // },

    // removeResources: (towns, { payload: { townId, resources } }: ChangeResourcesPayload) => {
    //   const town = towns[townId];
    //   for (const [k, v] of Object.entries(resources)) {
    //     if (isResourceId(k)) town.resources[k] -= v;
    //   }
    // },

    startBuildSomething: (towns, { payload: { townId, buildingId, queueBuildingId } }: StartBuildSomethingPayload) => {
      const town = towns[townId];
      const building = town.buildings[buildingId];
      const queueBuilding = town.buildings[queueBuildingId];
      const cost = baseBuildings[buildingId].getCost(building.queuedLevel);
      const buildTimeMs = baseBuildings[buildingId].getBuildTime(building.queuedLevel, queueBuilding.queuedLevel) * 1000;

      // ✔ Check if there is enough resources + population
      // ✖ Check if any building / research requirements are met

      if (hasRequirements(town.maxPopulation, town.population, town.resources, cost)) {
        // * remove resources
        town.resources = subResources(town.resources, cost.resources);

        building.queuedLevel += 1;
        town.population += cost.population ?? 0;

        const buildingQueue = town.queues.buildings[queueBuildingId];
        if (buildingQueue !== undefined) {
          const queueLength = buildingQueue.length;
          let completionTime;
          if (queueLength === 0) {
            completionTime = Date.now() + buildTimeMs;
          } else {
            completionTime = buildingQueue[queueLength - 1].completionTime + buildTimeMs;
          }
          const qItem = {
            building: buildingId, level: building.queuedLevel, duration: buildTimeMs, completionTime,
          };
          buildingQueue.push(qItem);
        } else {
          console.error(`No building queue exists for ${queueBuildingId} in town ${townId}, attempting to create it...`);
          town.queues.buildings = {
            ...town.queues.buildings,
            [queueBuildingId]: [
              {
                building: buildingId, level: building.queuedLevel, duration: buildTimeMs, completionTime: Date.now() + buildTimeMs,
              },
            ],
          };
        }
      }
    },

    startRecruitSomething: (
      towns, {
        payload: {
          townId, unitId, queueBuildingId, amount,
        },
      }: StartRecruitSomethingPayload,
    ) => {
      const town = towns[townId];
      const queueBuilding = town.buildings[queueBuildingId];
      const { cost } = baseUnits[unitId];
      const recruitTimeMs = baseUnits[unitId].getRecruitTime(queueBuilding.level) * 1000;

      // ✔ Check if there is enough resources + population
      // ✖ Check if any building / research requirements are met

      if (hasRequirements(town.maxPopulation, town.population, town.resources, cost)) {
        town.resources = subResources(town.resources, cost.resources);

        const unitQueue = town.queues.units[queueBuildingId];
        if (unitQueue !== undefined) {
          const startTime = Date.now(); // TODO calc it here TODODODODODODODO
          unitQueue.push({
            unit: unitId, recruitTimeMs, amount, recruited: 0, startTime,
          });
        } else {
          console.error(`No unit queue exists for ${queueBuildingId} in town ${townId}, attempting to create it...`);
          town.queues.units = {
            ...town.queues.units,
            [queueBuildingId]: [
              { unit: unitId, recruitTimeMs, amount },
            ],
          };
        }
      }
    },

  },
  extraReducers: (builder) => {
    builder.addCase(miscSlice.actions.tick, (towns, { payload }) => {
      // console.log("Processed tick in town slice!");
      // console.log(payload);

      Object.values(towns).forEach((town) => {
        // TODO below will error if we don't have every res id, maybe init towns with 0 rps of all
        const resToAdd: Resources = town.rps.map(([resId, resourcePerSec]) => [resId, (resourcePerSec / 1000) * payload.difference]);
        town.resources = addResourceArrays([town.resources, resToAdd]);

        // * check queues
        // * check battles (queue also)

        Object.values(town.queues.buildings).forEach((buildingQueue) => {
          buildingQueue?.forEach((queueItem, index) => {
            if (Date.now() > queueItem.completionTime) {
              if (isBuildingId(queueItem.building)) {
                // Remove finished building from queue
                buildingQueue?.splice(index, 1);

                // Update resource generation if the constructed building was a resource generation building
                const building = town.buildings[queueItem.building];
                const buildingData = baseBuildings[queueItem.building];
                if (buildingData instanceof ResourceBuilding) {
                  const newResourcesPerSecond = buildingData.getResourceGeneration(building.level + 1);
                  const oldResourcesPerSecond = buildingData.getResourceGeneration(building.level);

                  const additionalRps: Resources = buildingData.creates.map((resId) => [resId, newResourcesPerSecond - oldResourcesPerSecond]);
                  town.rps = addResourceArrays([town.rps, additionalRps]);
                }
                // Increment level
                building.level += 1;
              }
              //  else {
              //   console.error(`${queueItem.building} was not a valid building id.`);
              // }
            }
          });
        });

        Object.values(town.queues.units).forEach((unitQueue) => {
          unitQueue?.forEach((queueItem, index) => {
            if (index === 0) {
              if (queueItem.startTime === undefined) {
                queueItem.startTime = Date.now();
              }

              const timeNextUnit = queueItem.startTime + (queueItem.recruitTimeMs * (queueItem.recruited + 1));
              if (Date.now() > timeNextUnit) {
                const unit = town.units[queueItem.unit];

                if (unit !== undefined) {
                  unit.total += 1;
                  unit.town += 1;
                } else {
                  town.units[queueItem.unit] = {
                    total: 1,
                    town: 1,
                  };
                }

                queueItem.recruited += 1;
                if (queueItem.recruited === queueItem.amount) {
                  // Remove finished recruitment from queue
                  unitQueue?.splice(index, 1);
                }
              }
            }
          });
        });
      });
    });
  },
});

export const {
  createTown,
  addResources,
  // removeResources,
  startBuildSomething,
} = townSlice.actions;
