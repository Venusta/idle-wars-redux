import { BuildingId, ResourceId } from "../constants";
import { ResourceBuilding } from "../model/resourceBuilding";

export const clayPit = new ResourceBuilding({
  id: BuildingId.ClayPit,
  name: "Clay Pit",
  description: "",
  cost: {
    resources: [
      [ResourceId.Timber, 65],
      [ResourceId.Clay, 50],
      [ResourceId.Iron, 40],
    ],
    population: 10,
  },
  buildTime: 300,
  maxLevel: 30,
  creates: [ResourceId.Clay],
});
