import { BuildingId, UnitId } from "../constants";
import { Unit } from "../model/unit";

export const ram = new Unit({
  id: UnitId.Ram,
  name: "Ram",
  cost: {
    resources: {
      timber: 300,
      clay: 200,
      iron: 200,
    },
    population: 5,
  },
  buildTime: 600, // todo fix
  speed: 30,
  atkType: 2, // ???
  atk: 2,
  def: 20,
  defCav: 50,
  defArc: 20,
  carries: 0,
  researchCost: {
    resources: {
      timber: 1200,
      clay: 1600,
      iron: 800,
    },
  },
  requirements: {
    buildings: {
      // [BuildingId.Workshop]: 1,
    },
    research: true,
  },
});
