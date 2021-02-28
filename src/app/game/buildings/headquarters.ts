import { BuildingId } from "../constants";
import { ProductionBuilding } from "../model/productionBuilding";

export const headquarters = new ProductionBuilding({
  id: BuildingId.Headquarters,
  name: "Headquarters",
  description: "In the Headquarters you can construct new buildings or upgrade existing ones. The higher the level of your Headquarters, the faster the constructions will be finished. As soon as your Headquarters is upgraded to level 15, you will be able to demolish buildings in this village (requires 100% loyalty).",
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
    BuildingId.Headquarters,
    BuildingId.TimberCamp,
    BuildingId.ClayPit,
    BuildingId.IronMine,
    BuildingId.Barracks,
    BuildingId.Stable,
    BuildingId.Warehouse,
    BuildingId.Farm,
  ],
});
