import { BuildingId, ResourceId, UnitIdGathererArray } from "../constants";
import { GathererProductionBuilding } from "../model/buildings";

export const lumberCamp = new GathererProductionBuilding({
  id: BuildingId.LumberCamp,
  name: "Lumber Camp",
  description: "Yeet",
  cost: {
    resources: [
      [ResourceId.Timber, 270],
      [ResourceId.Clay, 240],
      [ResourceId.Iron, 260],
    ],
    population: 8,
  },
  maxLevel: 30,
  buildTime: 300,
  creates: UnitIdGathererArray,
});
