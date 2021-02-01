import { BuildingId } from "../constants";
import { ProductionBuilding } from "./base/productionBuilding";

export const headquarters = new ProductionBuilding({
  id: BuildingId.Headquarters,
  name: "Headquarters",
  cost: {
    timber: 270,
    clay: 240,
    iron: 260,
    population: 8,
  },
  maxLevel: 30,
  buildTime: 8,
  creates: {
    //light cavalry 
    //mounted archer
    //heavy cavalry
    //scout
  },
})
