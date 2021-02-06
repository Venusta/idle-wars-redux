import { BuildingId } from "../constants";
import { ResourceBuilding } from "./base/resourceBuilding";

export const ironMine = new ResourceBuilding({
  id: BuildingId.IronMine,
  name: "Iron Mine",
  cost: {
    resources: {
      timber: 75,
      clay: 65,
      iron: 70
    },
    population: 10
  }, 
  buildTime: 360, 
  maxLevel: 30 
})
