/* eslint-disable arrow-body-style */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { baseBuildings } from "../game/buildings";
import {
  BuildingIdType, ResourceIdType, UnitProductionBuildingIdType,
} from "../game/constants";
import { ResourceBuilding } from "../game/model/buildings/resourceBuilding";
import { baseUnits } from "../game/units";
import { hasRequirements } from "../util/hasRequirements";
import { FormsRecruitUnitData, miscSlice } from "./misc";
import { initialState } from "./townsInitialState";
import { ResourcesNormalised } from "../../types/townStateTypes";
import {
  addPartialResources, subResources, multiplyResources, isBuildingId,
} from "../util";

interface AddResource {
  townId: string
  resourceId: ResourceIdType
  amount: number
}

interface AddResources {
  townId: string
  resources: ResourcesNormalised
}

interface StartBuildSomething {
  townId: string;
  buildingId: BuildingIdType;
  queueBuildingId: BuildingIdType;
}

export interface RecruitFormQueueData {
  queueBuildingId: UnitProductionBuildingIdType
  formData: FormsRecruitUnitData[];
}

interface StartRecruitSomething {
  townId: string;
  data: RecruitFormQueueData[]
}

export const townSlice = createSlice({
  name: "town",
  initialState,
  reducers: {
    addResource: (towns, { payload: { townId, resourceId, amount } }: PayloadAction<AddResource>) => {
      const resource = towns.id[townId].resources.id[resourceId];
      if (resource === undefined) {
        towns.id[townId].resources.id[resourceId] = {
          id: resourceId,
          amount,
        };
        towns.id[townId].resources.all.push(resourceId);
      } else {
        resource.amount += amount;
      }
    },

    addResources: (towns, { payload: { townId, resources } }: PayloadAction<AddResources>) => {
      towns.id[townId].resources = addPartialResources(towns.id[townId].resources, [resources]);
    },

    startBuildSomething: (towns, { payload: { townId, buildingId, queueBuildingId } }: PayloadAction<StartBuildSomething>) => {
      const town = towns.id[townId];
      const building = town.buildings.id[buildingId];
      const queueBuilding = town.buildings.id[queueBuildingId];
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
          townId,
          data,
        },
      }: PayloadAction<StartRecruitSomething>,
    ) => {
      // todo send form data and process it
      // formData.barracks
      const town = towns.id[townId];
      // const queueBuilding = town.buildings.id[queueBuildingId];

      data.forEach((RecruitFormQueueData) => {
        const { formData, queueBuildingId } = RecruitFormQueueData;
        const queueBuilding = town.buildings.id[queueBuildingId];

        formData.forEach((unitData) => {
          const { unitId, amount } = unitData;

          const { cost } = baseUnits[unitId];
          const recruitTimeMs = baseUnits[unitId].getRecruitTime(queueBuilding.level) * 1000;
          const totalCost = { resources: multiplyResources(cost.resources, amount), population: cost.population * amount };

          // ✔ Check if there is enough resources + population
          // ✖ Check if any building / research requirements are met

          if (hasRequirements(town.maxPopulation, town.population, town.resources, totalCost)) {
            town.resources = subResources(town.resources, totalCost.resources);

            const unitQueue = town.queues.units[queueBuildingId];
            if (unitQueue !== undefined) {
              // const startTime = Date.now(); // TODO calc it here TODODODODODODODO
              unitQueue.push({
                unit: unitId, recruitTimeMs, amount, recruited: 0,
              });
            } else {
              console.error(`No unit queue exists for ${queueBuildingId} in town ${townId}, attempting to create it...`);
              town.queues.units = {
                ...town.queues.units,
                [queueBuildingId]: [
                  {
                    unit: unitId, recruitTimeMs, amount, recruited: 0,
                  },
                ],
              };
            }
          }
        });
      });

      /**
       *
       * * to get unit for x building
       * TODO formSelector => basebuildings[id].creates .map (id) => units.id[id]
       * * can just do this for each recruit building for the Recruit UI
       *
       * * Loops over Object.values(formData) => unitData
       * * unitData { unitId, amount }
       * * queueBuildingId Needed to calculate time & find the queue to queue the units in
       * * queueBuildingId has to come with the dispatch
       * ! queueBuildingId can't come from the unit itself
       *
       * ? Recruit building is maybe ui only? Just have it use the proper buildings still.
       *
       * ? Option 1: "createdBy" on the unit to get which building creates it
       * !    Problematic with multiple buildings building the same unit
       * *    This would require checking it with baseUnits[unitId].createdBy
       * *    For the UI we would loop over baseBuildings[buildingId].creates
       *
       *
       * ? Option 2: keep buildings on the forms
       */

      // Object.values(formData).forEach((unitData) => {
      //   if (unitData !== undefined) {
      //     const { unitId, amount } = unitData;
      //     const { cost } = baseUnits[unitId];
      //     const recruitTimeMs = baseUnits[unitId].getRecruitTime(queueBuilding.level) * 1000;
      //     const totalCost = { resources: multiplyResources(cost.resources, amount), population: cost.population * amount };

      //     // ✔ Check if there is enough resources + population
      //     // ✖ Check if any building / research requirements are met

      //     if (hasRequirements(town.maxPopulation, town.population, town.resources, totalCost)) {
      //       town.resources = subResources(town.resources, totalCost.resources);

      //       const unitQueue = town.queues.units[queueBuildingId];
      //       if (unitQueue !== undefined) {
      //         // const startTime = Date.now(); // TODO calc it here TODODODODODODODO
      //         unitQueue.push({
      //           unit: unitId, recruitTimeMs, amount, recruited: 0,
      //         });
      //       } else {
      //         console.error(`No unit queue exists for ${queueBuildingId} in town ${townId}, attempting to create it...`);
      //         town.queues.units = {
      //           ...town.queues.units,
      //           [queueBuildingId]: [
      //             {
      //               unit: unitId, recruitTimeMs, amount, recruited: 0,
      //             },
      //           ],
      //         };
      //       }
      //     }
      //   }
      // });
    },

  },

  extraReducers: (builder) => {
    builder.addCase(miscSlice.actions.tick, (towns, { payload }) => {
      // console.log("Processed tick in town slice!");
      // console.log(payload);

      Object.values(towns.id).forEach((town) => {
        const resToAdd = multiplyResources(town.rps, payload.difference / 1000);
        town.resources = addPartialResources(town.resources, [resToAdd]);

        // * check queues
        // * check battles (queue also)

        Object.values(town.queues.buildings).forEach((buildingQueue) => {
          buildingQueue?.forEach((queueItem, index) => {
            if (Date.now() > queueItem.completionTime) {
              // TODO REMOVE THIS AND DO THE QUEUE BYID / ALLIDS
              if (isBuildingId(queueItem.building)) {
                // Remove finished building from queue
                buildingQueue?.splice(index, 1);

                // Update resource generation if the constructed building was a resource generation building
                const building = town.buildings.id[queueItem.building];
                const buildingData = baseBuildings[queueItem.building];
                if (buildingData instanceof ResourceBuilding) {
                  const newResourcesPerSecond = buildingData.getResourceGeneration(building.level + 1);
                  const oldResourcesPerSecond = buildingData.getResourceGeneration(building.level);

                  // ? rewrite IT MIGHT WORK AHHHHHHHHH
                  buildingData.creates.forEach((id) => {
                    const res = town.rps.id[id];
                    if (res !== undefined) {
                      res.amount += newResourcesPerSecond - oldResourcesPerSecond;
                    }
                  });
                }
                // Increment level
                building.level += 1;
              }
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
                const unit = town.units.id[queueItem.unit];

                if (unit !== undefined) {
                  unit.total += 1;
                  unit.town += 1;
                } else {
                  // ? should work
                  town.units.id[queueItem.unit] = {
                    id: queueItem.unit,
                    total: 1,
                    town: 1,
                  };
                  town.units.all.push(queueItem.unit);
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
  addResource,
  addResources,
  startBuildSomething,
  startRecruitSomething,
} = townSlice.actions;
