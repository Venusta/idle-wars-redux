import { BuildingId, UnitId } from "../constants";
import { Unit } from "../model/unit";

export const scout = new Unit({
  id: UnitId.Scout,
  name: "Scout",
  cost: {
    resources: {
      timber: 100,
      clay: 30,
      iron: 60,
    },
    population: 2,
  },
  buildTime: 300,
  speed: 9,
  atkType: 2,
  atk: 0,
  def: 2,
  defCav: 1,
  defArc: 2,
  carries: 0,
  researchCost: {
    resources: {
      timber: 560,
      clay: 480,
      iron: 480,
    },
  },
  requirements: {
    buildings: {
      [BuildingId.Stable]: 1,
    },
    research: true,
  },
});
