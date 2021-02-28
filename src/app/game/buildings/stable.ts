import { BuildingId, UnitId } from "../constants";
import { UnitProductionBuilding } from "../model/unitProductionBuilding";

export const stable = new UnitProductionBuilding({
  id: BuildingId.Stable,
  name: "Stable",
  description: "",
  cost: {
    resources: {
      timber: 270,
      clay: 240,
      iron: 260,
    },
    population: 8,
  },
  maxLevel: 30,
  buildTime: 300,
  creates: [
    UnitId.Scout,
    UnitId.LightCavalry,
  ],
});
