import { UnitId } from "../constants";
import { Unit } from "../model/unit";

export const paladin = new Unit({
  id: UnitId.Paladin,
  name: "Paladin",
  cost: {
    resources: {
      timber: 20,
      clay: 20,
      iron: 40
    },
    population: 10
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
    statue: 1,
  }
})
