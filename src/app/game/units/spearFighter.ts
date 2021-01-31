import { Unit } from "../unit";

export const spearFighter = new Unit({
  id: 0,
  name: "Spear Fighter",
  cost: {
    timber: 50,
    clay: 30,
    iron: 10,
    population: 1
  },
  buildTime: 680,
  speed: 18,
  atkType: 0,
  atk: 10,
  def: 15,
  defCav: 45,
  defArc: 20,
  carries: 25,
})
