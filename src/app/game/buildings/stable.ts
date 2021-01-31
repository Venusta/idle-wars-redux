import { STABLE } from "../constants";
import { ProductionBuilding } from "../productionBuilding";

export const Stable = new ProductionBuilding({
  id: STABLE,
  name: "Stable",
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
