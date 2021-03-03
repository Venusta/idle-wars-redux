import { BuildingId, ResourceId, UnitId } from "../constants";
import { Unit } from "../model/unit";

export const archer = new Unit({
  id: UnitId.Archer,
  name: "Archer",
  cost: {
    resources: [
      [ResourceId.Timber, 100],
      [ResourceId.Clay, 30],
      [ResourceId.Iron, 60],
    ],
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
    resources: [
      [ResourceId.Timber, 640],
      [ResourceId.Clay, 560],
      [ResourceId.Iron, 740],
    ],
  },
  requirements: {
    buildings: {
      [BuildingId.Smithy]: 5,
      [BuildingId.Barracks]: 5,
    },
    research: true,
  },
});
