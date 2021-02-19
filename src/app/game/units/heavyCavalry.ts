import { UnitId, BuildingId } from "../constants";
import { Unit } from "../model/unit";

export const heavyCavalry = new Unit({
  id: UnitId.HeavyCavalry,
  name: "Heavy Cavalry",
  cost: {
    resources: {
      timber: 200,
      clay: 150,
      iron: 600
    },
    population: 6
  },
  buildTime: 600, // fix
  speed: 11, 
  atkType: 2,
  atk: 150,
  def: 200,
  defCav: 80,
  defArc: 180,
  carries: 50,
  researchCost: {
    resources: {
      timber: 3000,
      clay: 2400,
      iron: 2000
    }
  },
  requirements: {
    [BuildingId.Stable]: 10,
    smithy: 15,
  }
})
