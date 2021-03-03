import { ResourceId, UnitId } from "../constants";
import { Unit } from "../model/unit";

export const nobleman = new Unit({
  id: UnitId.Nobleman,
  name: "Nobleman",
  cost: {
    resources: [
      [ResourceId.Timber, 40000],
      [ResourceId.Clay, 50000],
      [ResourceId.Iron, 50000],
    ],
    population: 100,
  },
  buildTime: 680, // ???
  speed: 35,
  atkType: 0,
  atk: 30,
  def: 100,
  defCav: 50,
  defArc: 100,
  carries: 0,
  requirements: {
    buildings: {
      // [BuildingId.Academy]: 1,
    },
    research: false,
  },
});
