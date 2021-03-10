import { BuildingId, ResourceId } from "../constants";
import { FarmBuilding } from "../model/buildings";

export const farm = new FarmBuilding({
  id: BuildingId.Farm,
  name: "Farm",
  description: "The farm supplies your workers and troops with food. Without extending your farm your village cannot grow. The higher its level the more villagers can be supplied.",
  cost: {
    resources: [
      [ResourceId.Timber, 45],
      [ResourceId.Clay, 40],
      [ResourceId.Iron, 30],
    ],
    population: 0,
  },
  maxLevel: 30,
  buildTime: 300,
});
