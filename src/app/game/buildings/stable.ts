import { BuildingId } from "../constants";
import { ProductionBuilding } from "./base/productionBuilding";

export const stable = new ProductionBuilding({
  id: BuildingId.Stable,
  name: "Stable",
  cost: {
    timber: 270,
    clay: 240,
    iron: 260,
    population: 8,
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
