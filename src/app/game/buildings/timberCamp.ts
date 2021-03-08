import { BuildingId, ResourceId } from "../constants";
import { ResourceBuilding } from "../model/resourceBuilding";

export const timberCamp = new ResourceBuilding({
  id: BuildingId.TimberCamp,
  name: "Timber Camp",
  description: "Outside of your village in the dark forests your lumberjacks cut massive trees to produce wood in the timber camp, which is needed for buildings and weapons. The higher its level the more wood is produced.",
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
