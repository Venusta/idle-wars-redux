import { BuildingId } from "../constants";
import { StorageBuilding } from "../model/storageBuilding";

export const warehouse = new StorageBuilding({
  id: BuildingId.Warehouse,
  name: "Warehouse",
  description: "The warehouse stores your resources. The higher its level the more resources can be stored.",
  cost: {
    resources: {
      timber: 60,
      clay: 50,
      iron: 40,
    },
    population: 0,
  },
  maxLevel: 30,
  buildTime: 300,
});
