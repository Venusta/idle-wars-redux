import { UnitId } from "../constants";
import { Unit } from "../model/unit";

export const axeman = new Unit({
  id: UnitId.Axeman,
  name: "Axeman",
  cost: {
    resources: {
      timber: 60,
      clay: 30,
      iron: 40
    },
    population: 1
  },
  buildTime: 680,
  speed: 18,
  atkType: 0,
  atk: 40,
  def: 10,
  defCav: 5,
  defArc: 10,
  carries: 10,
  researchCost: {
    resources: {
      timber: 700,
      clay: 840,
      iron: 820
    }
  },
  requirements: {
    smithy: 2,
  }
})
