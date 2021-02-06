import { UnitId } from "../constants";
import { Unit } from "./base/unit";

export const swordsman = new Unit({
  id: UnitId.Swordsman,
  name: "Swordsman",
  cost: {
    resources: {
      timber: 30,
      clay: 30,
      iron: 70
    },
    population: 1
  },
  buildTime: 500,
  speed: 7.333,
  atkType: 0,
  atk: 25,
  def: 50,
  defCav: 25,
  defArc: 40,
  carries: 15,
})
