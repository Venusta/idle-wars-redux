import { BuildingId, ResourceId, UnitId } from "../constants";
import { Unit } from "../model/unit";

export const swordsman = new Unit({
  id: UnitId.Swordsman,
  name: "Swordsman",
  cost: {
    resources: [
      [ResourceId.Timber, 30],
      [ResourceId.Clay, 30],
      [ResourceId.Iron, 70],
    ],
    population: 1,
  },
  buildTime: 500,
  speed: 22,
  atkType: 0,
  atk: 25,
  def: 50,
  defCav: 25,
  defArc: 40,
  carries: 15,
  requirements: {
    buildings: {
      [BuildingId.Smithy]: 1,
    },
    research: false,
  },
});
