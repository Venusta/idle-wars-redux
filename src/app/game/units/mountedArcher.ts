import { BuildingId, ResourceId, UnitId } from "../constants";
import { Unit } from "../model/unit";

export const mountedarcher = new Unit({
  id: UnitId.MountedArcher,
  name: "MountedArcher",
  cost: {
    resources: [
      [ResourceId.Timber, 600],
      [ResourceId.Clay, 496],
      [ResourceId.Iron, 416],
    ],
    population: 5,
  },
  buildTime: 1200, // ???? fix
  speed: 10,
  atkType: 1, // ?? fix
  atk: 120,
  def: 40,
  defCav: 30,
  defArc: 50,
  carries: 50,
  researchCost: {
    resources: [
      [ResourceId.Timber, 3000],
      [ResourceId.Clay, 2400],
      [ResourceId.Iron, 2000],
    ],
  },
  requirements: {
    buildings: {
      [BuildingId.Stable]: 5,
    },
    research: true,
  },
});
