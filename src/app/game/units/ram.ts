import { BuildingId, ResourceId, UnitId } from "../constants";
import { Unit } from "../model/unit";

export const ram = new Unit({
  id: UnitId.Ram,
  name: "Ram",
  cost: {
    resources: [
      [ResourceId.Timber, 300],
      [ResourceId.Clay, 200],
      [ResourceId.Iron, 200],
    ],
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
    resources: [
      [ResourceId.Timber, 1200],
      [ResourceId.Clay, 1600],
      [ResourceId.Iron, 800],
    ],
  },
  requirements: {
    buildings: {
      [BuildingId.Workshop]: 1,
    },
    research: true,
  },
});
