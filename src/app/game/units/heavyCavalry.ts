import { UnitId, BuildingId, ResourceId } from "../constants";
import { Unit } from "../model/unit";

export const heavyCavalry = new Unit({
  id: UnitId.HeavyCavalry,
  name: "Heavy Cavalry",
  cost: {
    resources: [
      [ResourceId.Timber, 200],
      [ResourceId.Clay, 150],
      [ResourceId.Iron, 600],
    ],
    population: 6,
  },
  buildTime: 600, // fix
  speed: 11,
  atkType: 2,
  atk: 150,
  def: 200,
  defCav: 80,
  defArc: 180,
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
      [BuildingId.Stable]: 10,
      [BuildingId.Smithy]: 15,
    },
    research: true,
  },
});
