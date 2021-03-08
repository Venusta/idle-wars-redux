import { BuildingId, ResourceId } from "../constants";
import { StorageBuilding } from "../model/buildings/storageBuilding";

export const warehouse = new StorageBuilding({
  id: BuildingId.Warehouse,
  name: "Warehouse",
  description: "The warehouse stores your resources. The higher its level the more resources can be stored.",
  cost: {
    resources: [
      [ResourceId.Timber, 60],
      [ResourceId.Clay, 50],
      [ResourceId.Iron, 40],
    ],
    population: 0,
  },
  maxLevel: 30,
  buildTime: 300,
});
