import { BuildingId, UnitId } from "../constants";
import { Unit } from "../model/unit";

export const archer = new Unit({
  id: UnitId.Archer,
  name: "Archer",
  cost: {
    resources: {
      timber: 100,
      clay: 30,
      iron: 60,
    },
    population: 1,
  },
  buildTime: 1200,
  speed: 18,
  atkType: 1,
  atk: 15,
  def: 50,
  defCav: 40,
  defArc: 5,
  carries: 10,
  researchCost: {
    resources: {
      timber: 640,
      clay: 560,
      iron: 740,
    },
  },
  requirements: {
    buildings: {
      [BuildingId.Smithy]: 5,
      [BuildingId.Barracks]: 5,
    },
    research: true,
  },
});
