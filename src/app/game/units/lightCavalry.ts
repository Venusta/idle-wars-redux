import { BuildingId, ResourceId, UnitId } from "../constants";
import { Unit } from "../model/unit";

export const lightCavalry = new Unit({
  id: UnitId.LightCavalry,
  name: "Light Cavalry",
  cost: {
    resources: [
      [ResourceId.Timber, 125],
      [ResourceId.Clay, 100],
      [ResourceId.Iron, 250],
    ],
    population: 4,
  },
  buildTime: 600,
  speed: 10,
  atkType: 2,
  atk: 130,
  def: 30,
  defCav: 40,
  defArc: 30,
  carries: 80,
  researchCost: {
    resources: [
      [ResourceId.Timber, 2200],
      [ResourceId.Clay, 2400],
      [ResourceId.Iron, 2000],
    ],
  },
  requirements: {
    buildings: {
      [BuildingId.Stable]: 3,
    },
    research: true,
  },
});
