import { BuildingId, ResourceId } from "../constants";
import { ResourceBuilding } from "../model/resourceBuilding";

export const timberCamp = new ResourceBuilding({
  id: BuildingId.TimberCamp,
  name: "Timber Camp",
  description: "",
  cost: {
    resources: [
      [ResourceId.Timber, 50],
      [ResourceId.Clay, 60],
      [ResourceId.Iron, 40],
    ],
    population: 5,
  },
  maxLevel: 30,
  buildTime: 300,
  creates: [ResourceId.Timber],
});
