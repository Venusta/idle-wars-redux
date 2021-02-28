import { BuildingId, UnitId } from "../constants";
import { UnitProductionBuilding } from "../model/unitProductionBuilding";

export const barracks = new UnitProductionBuilding({
  id: BuildingId.Barracks,
  name: "Barracks",
  description: "In the barracks you can recruit infantry. The higher its level the faster the recruitment of troops will be finished.",
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
    UnitId.SpearFighter,
    UnitId.Swordsman,
    UnitId.Axeman,
    UnitId.Archer,
  ],
});
