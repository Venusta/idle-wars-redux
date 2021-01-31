import { Building } from "./building";
import { BuildingProps, Resources } from "../../../../types/types";
import { BuildingId } from "../../constants"

export class ResourceBuilding extends Building {

  constructor({ id, name, cost, maxLevel, buildTime }: BuildingProps) {
    super({ id, name, cost, maxLevel, buildTime })
  }

  getResourceGeneration(level: number): Resources {
    let resourceAmount = 5;
    if (level > 0) {
      resourceAmount = 30 * 1.163118 ^ (level - 1)
    }
    switch(this.id) {
      case BuildingId.TimberCamp:
        return { timber: resourceAmount, clay: 0, iron: 0 };
      case BuildingId.ClayPit:
        return { timber: 0, clay: resourceAmount, iron: 0 };
      case BuildingId.IronMine:
        return { timber: 0, clay: 0, iron: resourceAmount };
      default:
        console.error(`Unexpected bulding id in getResourceGeneration: ${this.id}`)
        return { timber: 0, clay: 0, iron: 0 };
    }
  }
}
