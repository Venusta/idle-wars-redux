import { BuildingId } from "../constants";
import { ResourceBuilding } from "./base/resourceBuilding";

export const clayPit = new ResourceBuilding({
  id: BuildingId.ClayPit,
  name: "Clay Pit",
  cost: {
    resources: {
      timber: 65,
      clay: 50,
      iron: 40
    },    
    population: 10
  }, 
  buildTime: 300, 
  maxLevel: 30 
})
