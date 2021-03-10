import { BuildingId, ResourceId, UnitIdStatue } from "../constants";
import { StatueBuilding } from "../model/buildings";

export const statue = new StatueBuilding({
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
    UnitIdStatue.Paladin,
  ],
});
