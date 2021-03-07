/* eslint-disable arrow-body-style */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResourcesTuple } from "../../types/types";
import { baseBuildings } from "../game/buildings";
import { BuildingId, ResourceId } from "../game/constants";
import { addResourceArrays } from "../game/manipulationUtils";
import { ResourceBuilding } from "../game/model/resourceBuilding";
import { isBuildingId } from "../game/utility";
import {
  addPartialResources, hasRequirements, multiplyResources, subResources,
} from "../util/normalisedZone";
import { miscSlice } from "./misc";
import { initialState } from "./newTownsInitialState";
import { ResourcesNormalised } from "./townStateTypes";

interface AddResource {
  townId: string
  resourceId: ResourceId
  amount: number
}

interface AddResources {
  townId: string
  resources: ResourcesNormalised
}

interface StartBuildSomething {
  townId: string;
  buildingId: BuildingId;
  queueBuildingId: BuildingId;

}

export const townSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    addResource: (towns, { payload: { townId, resourceId, amount } }: PayloadAction<AddResource>) => {
      const resource = towns.byId[townId].resources.byId[resourceId];
      if (resource === undefined) {
        towns.byId[townId].resources.byId[resourceId] = {
          id: resourceId,
          amount,
        };
        towns.byId[townId].resources.allIds.push(resourceId);
      } else {
        resource.amount += amount;
      }
    },
    addResources: (towns, { payload: { townId, resources } }: PayloadAction<AddResources>) => {
      towns.byId[townId].resources = addPartialResources(towns.byId[townId].resources, [resources]);
    },
    startBuildSomething: (towns, { payload: { townId, buildingId, queueBuildingId } }: PayloadAction<StartBuildSomething>) => {
      const town = towns.byId[townId];
      const building = town.buildings.byId[buildingId];
      const queueBuilding = town.buildings.byId[queueBuildingId];
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
  },

  extraReducers: (builder) => {
    builder.addCase(miscSlice.actions.tick, (towns, { payload }) => {
      // console.log("Processed tick in town slice!");
      // console.log(payload);

      Object.values(towns.byId).forEach((town) => {
        const resToAdd = multiplyResources(town.rps, payload.difference / 1000);
        town.resources = addPartialResources(town.resources, [resToAdd]);

        // * check queues
        // * check battles (queue also)

        Object.values(town.queues.buildings).forEach((buildingQueue) => {
          buildingQueue?.forEach((queueItem, index) => {
            if (Date.now() > queueItem.completionTime) {
              if (isBuildingId(queueItem.building)) {
                // Remove finished building from queue
                buildingQueue?.splice(index, 1);

                // Update resource generation if the constructed building was a resource generation building
                const building = town.buildings.byId[queueItem.building];
                const buildingData = baseBuildings[queueItem.building];
                if (buildingData instanceof ResourceBuilding) {
                  const newResourcesPerSecond = buildingData.getResourceGeneration(building.level + 1);
                  const oldResourcesPerSecond = buildingData.getResourceGeneration(building.level);

                  // ? rewrite IT MIGHT WORK AHHHHHHHHH
                  buildingData.creates.forEach((id) => {
                    const res = town.rps.byId[id];
                    if (res !== undefined) {
                      res.amount += newResourcesPerSecond - oldResourcesPerSecond;
                    }
                  });

                  // const additionalRps: ResourcesNormalised = buildingData.creates.map((resId) => {
                  //   return [resId, newResourcesPerSecond - oldResourcesPerSecond];
                  // });
                  // town.rps = addPartialResources(town.rps, [additionalRps]);
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
                const unit = town.units.byId[queueItem.unit];

                if (unit !== undefined) {
                  unit.total += 1;
                  unit.town += 1;
                } else {
                  // ? should work
                  town.units.byId[queueItem.unit] = {
                    id: queueItem.unit,
                    total: 1,
                    town: 1,
                  };
                  town.units.allIds.push(queueItem.unit);
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
} = townSlice.actions;
