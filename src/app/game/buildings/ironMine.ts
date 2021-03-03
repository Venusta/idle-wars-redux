import { BuildingId, ResourceId } from "../constants";
import { ResourceBuilding } from "../model/resourceBuilding";

export const ironMine = new ResourceBuilding({
  id: BuildingId.IronMine,
  name: "Iron Mine",
  description: "",
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
