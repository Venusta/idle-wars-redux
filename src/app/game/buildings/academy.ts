import { BuildingId, ResourceId, UnitId } from "../constants";
import { UnitProductionBuilding } from "../model/unitProductionBuilding";

export const academy = new UnitProductionBuilding({
  id: BuildingId.Academy,
  name: "Academy",
  description: "In the academy you can educate noblemen. Noblemen allow you to conquer other villages by reducing their loyalty.",
  cost: {
    resources: [
      [ResourceId.Timber, 15000],
      [ResourceId.Clay, 25000],
      [ResourceId.Iron, 10000],
    ],
    population: 80,
  },
  maxLevel: 1,
  buildTime: 3000,
  creates: [
    UnitId.Nobleman,
  ],
});
