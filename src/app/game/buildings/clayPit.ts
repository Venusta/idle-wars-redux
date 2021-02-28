import { BuildingId, ResourceId } from "../constants";
import { ResourceBuilding } from "../model/resourceBuilding";

export const clayPit = new ResourceBuilding({
  id: BuildingId.ClayPit,
  name: "Clay Pit",
  description: "",
  cost: {
    resources: {
      timber: 65,
      clay: 50,
      iron: 40,
    },
    population: 10,
  },
  buildTime: 300,
  maxLevel: 30,
  creates: [ResourceId.Clay],
});
