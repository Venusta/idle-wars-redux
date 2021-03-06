import { ResourceId, UnitId } from "../constants";
import { Unit } from "../model/unit";

export const spearFighter = new Unit({
  id: UnitId.SpearFighter,
  name: "Spear Fighter",
  cost: {
    resources: [
      [ResourceId.Timber, 50],
      [ResourceId.Clay, 30],
      [ResourceId.Iron, 10],
    ],
    population: 1,
  },
  buildTime: 680,
  speed: 18,
  atkType: 0,
  atk: 10,
  def: 15,
  defCav: 45,
  defArc: 20,
  carries: 25,
});
