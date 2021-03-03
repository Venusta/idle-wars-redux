import { BuildingId, ResourceId, UnitId } from "../constants";
import { UnitProductionBuilding } from "../model/unitProductionBuilding";

export const barracks = new UnitProductionBuilding({
  id: BuildingId.Barracks,
  name: "Barracks",
  description: "In the barracks you can recruit infantry. The higher its level the faster the recruitment of troops will be finished.",
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
  creates: [
    UnitId.SpearFighter,
    UnitId.Swordsman,
    UnitId.Axeman,
    UnitId.Archer,
  ],
});

// const derp = [
//   [ResourceId.Timber, 500],
//   [ResourceId.Clay, 500],
//   [ResourceId.Iron, 500],
// ];
