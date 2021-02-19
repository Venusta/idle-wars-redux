import { UnitId } from "../constants";
import { Unit } from "../model/unit";

export const lightCavalry = new Unit({
  id: UnitId.LightCavalry,
  name: "Light Cavalry",
  cost: {
    resources: {
      timber: 125,
      clay: 100,
      iron: 250
    },
    population: 4
  },
  buildTime: 600,
  speed: 10,
  atkType: 2,
  atk: 130,
  def: 30,
  defCav: 40,
  defArc: 30,
  carries: 80,
  researchCost: {
    resources: {
      timber: 2200,
      clay: 2400,
      iron: 2000
    }
  },
  requirements: {
    stable: 3,
  }
})
