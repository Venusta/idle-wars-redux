import { TIMBERCAMP } from "../constants";
import { ResourceBuilding } from "../resourceBuilding";

export const timberCamp = new ResourceBuilding({
  id: TIMBERCAMP,
  name: "Timber Camp",
  cost: {
    timber: 50,
    clay: 60,
    iron: 40,
    population: 5,
  },
  maxLevel: 30,
  buildTime: 8,
  generate: {
    timber: 5
  },
})
