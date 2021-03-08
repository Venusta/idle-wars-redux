import { BuildingId, ResourceId, UnitId } from "../constants";
import { UnitProductionBuilding } from "../model/unitProductionBuilding";

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
  creates: [
    UnitId.Scout,
    UnitId.LightCavalry,
    UnitId.HeavyCavalry,
    UnitId.MountedArcher,
  ],
});
