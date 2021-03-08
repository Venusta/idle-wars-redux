import { BuildingId, ResourceId, UnitId } from "../constants";
import { UnitProductionBuilding } from "../model/buildings/unitProductionBuilding";

export const statue = new UnitProductionBuilding({
  id: BuildingId.Statue,
  name: "Statue",
  description: "At the statue you can recruit a paladin if you do not have one yet. You can have only one paladin at a time. ",
  cost: {
    resources: [
      [ResourceId.Timber, 220],
      [ResourceId.Clay, 220],
      [ResourceId.Iron, 220],
    ],
    population: 10,
  },
  maxLevel: 1,
  buildTime: 300,
  creates: [
    UnitId.Paladin,
  ],
});
