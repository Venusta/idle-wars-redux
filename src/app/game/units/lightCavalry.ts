import { UnitId } from "../constants";
import { Unit } from "../model/unit";

export const lightCavalry = new Unit({
  id: UnitId.Scout,
  name: "Scout",
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
})
