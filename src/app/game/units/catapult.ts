import { UnitId } from "../constants";
import { Unit } from "../model/unit";

export const catapult = new Unit({
  id: UnitId.Catapult,
  name: "Catapult",
  cost: {
    resources: {
      timber: 320,
      clay: 400,
      iron: 100
    },
    population: 8
  },
  buildTime: 600, // todo fix
  speed: 30,
  atkType: 2, // ??? 
  atk: 100,
  def: 100,
  defCav: 50,
  defArc: 100,
  carries: 0,
  researchCost: {
    resources: {
      timber: 1600,
      clay: 2000,
      iron: 1200
    }
  },
  requirements: {
    workshop: 2,
    smithy: 12,
  }
})
