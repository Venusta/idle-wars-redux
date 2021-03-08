import { BuildingId, ResourceId } from "../constants";
import { ResourceBuilding } from "../model/buildings/resourceBuilding";

export const ironMine = new ResourceBuilding({
  id: BuildingId.IronMine,
  name: "Iron Mine",
  description: "In the iron mine your workers dig the war-crucial iron. The higher its level the more iron is produced.",
  cost: {
    resources: [
      [ResourceId.Timber, 75],
      [ResourceId.Clay, 65],
      [ResourceId.Iron, 70],
    ],
    population: 10,
  },
  buildTime: 360,
  maxLevel: 30,
  creates: [ResourceId.Iron],
});
