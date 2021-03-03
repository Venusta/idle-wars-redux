import { ResourceId, UnitId } from "../constants";
import { Unit } from "../model/unit";

export const paladin = new Unit({
  id: UnitId.Paladin,
  name: "Paladin",
  cost: {
    resources: [
      [ResourceId.Timber, 20],
      [ResourceId.Clay, 20],
      [ResourceId.Iron, 40],
    ],
    population: 10,
  },
  buildTime: 680, // todo fix
  speed: 10,
  atkType: 0, // ???
  atk: 150,
  def: 250,
  defCav: 400,
  defArc: 150,
  carries: 100,

  requirements: {
    buildings: {
      // [BuildingId.Statue]: 1,
    },
    research: false,
  },
});
