import { BuildingId, ResourceId, UnitId } from "../constants";
import { Unit } from "../model/unit";

export const axeman = new Unit({
  id: UnitId.Axeman,
  name: "Axeman",
  cost: {
    resources: [
      [ResourceId.Timber, 60],
      [ResourceId.Clay, 30],
      [ResourceId.Iron, 40],
    ],
    population: 1,
  },
  buildTime: 680,
  speed: 18,
  atkType: 0,
  atk: 40,
  def: 10,
  defCav: 5,
  defArc: 10,
  carries: 10,
  researchCost: {
    resources: [
      [ResourceId.Timber, 700],
      [ResourceId.Clay, 840],
      [ResourceId.Iron, 820],
    ],
  },
  requirements: {
    buildings: {
      [BuildingId.Smithy]: 2,
    },
    research: true,
  },
});
