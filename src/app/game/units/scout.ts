import { BuildingId, ResourceId, UnitId } from "../constants";
import { Unit } from "../model/unit";

export const scout = new Unit({
  id: UnitId.Scout,
  name: "Scout",
  cost: {
    resources: [
      [ResourceId.Timber, 100],
      [ResourceId.Clay, 30],
      [ResourceId.Iron, 60],
    ],
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
    resources: [
      [ResourceId.Timber, 560],
      [ResourceId.Clay, 480],
      [ResourceId.Iron, 480],
    ],
  },
  requirements: {
    buildings: {
      [BuildingId.Stable]: 1,
    },
    research: true,
  },
});
