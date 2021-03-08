import { BuildingId, ResourceId } from "../constants";
import { ResourceBuilding } from "../model/resourceBuilding";

export const clayPit = new ResourceBuilding({
  id: BuildingId.ClayPit,
  name: "Clay Pit",
  description: "In the clay pit your workers extract clay, which is important for new buildings. The higher its level the more clay is produced.",
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
