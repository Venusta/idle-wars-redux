import { BuildingId, ResourceId, UnitIdStableArray } from "../constants";
import { UnitProductionBuilding } from "../model/buildings";

export const stable = new UnitProductionBuilding({
  id: BuildingId.Stable,
  name: "Stable",
  description: "In the stables you can recruit cavalry. The higher its level the faster the recruitment of the troops will be finished.",
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
  creates: UnitIdStableArray,
});
