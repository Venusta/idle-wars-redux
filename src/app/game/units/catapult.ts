import { BuildingId, ResourceId, UnitId } from "../constants";
import { Unit } from "../model/unit";

export const catapult = new Unit({
  id: UnitId.Catapult,
  name: "Catapult",
  cost: {
    resources: [
      [ResourceId.Timber, 320],
      [ResourceId.Clay, 400],
      [ResourceId.Iron, 100],
    ],
    population: 8,
  },
  buildTime: 600, // todo fix
  speed: 30,
  atkType: 2, // ???
  atk: 100,
  def: 100,
  defCav: 50,
  defArc: 100,
  carries: 0,
  researchCost: {
    resources: [
      [ResourceId.Timber, 1600],
      [ResourceId.Clay, 2000],
      [ResourceId.Iron, 1200],
    ],
  },
  requirements: {
    buildings: {
    // [BuildingId.Workshop]: 2,
      [BuildingId.Smithy]: 12,
    },
    research: true,
  },
});
