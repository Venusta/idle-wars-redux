import { UnitId } from "../constants";
import { Unit } from "../model/unit";

export const nobleman = new Unit({
  id: UnitId.Nobleman,
  name: "Nobleman",
  cost: {
    resources: {
      timber: 40000,
      clay: 50000,
      iron: 50000
    },
    population: 100
  },
  buildTime: 680, // ???
  speed: 35,
  atkType: 0,
  atk: 30,
  def: 100,
  defCav: 50,
  defArc: 100,
  carries: 0,
  researchCost: {
    resources: {
      timber: 700,
      clay: 840,
      iron: 820
    }
  },
  requirements: {
    Academy: 1,
  }
});
