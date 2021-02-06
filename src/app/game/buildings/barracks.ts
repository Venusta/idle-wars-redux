import { BuildingId } from "../constants";
import { ProductionBuilding } from "./base/productionBuilding";

export const barracks = new ProductionBuilding({
  id: BuildingId.Barracks,
  name: "Barracks",
  cost: {
    resources: {
      timber: 270,
      clay: 240,
      iron: 260
    },
    population: 8    
  },
  maxLevel: 30,
  buildTime: 300,
  creates: {
    //light cavalry 
    //mounted archer
    //heavy cavalry
    //scout
  },
})
