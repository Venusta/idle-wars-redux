import { BuildingProps, Cost } from "../../../../types/types";
import { WorldSpeed } from "../../constants"

export class Building {
  id: number;
  name: string;
  cost: any;
  maxLevel: number;
  buildTime: number;
  requirements: any;

  constructor({ id, name, cost, maxLevel, buildTime, requirements }: BuildingProps) {
    this.id = id;
    this.name = name;
    this.cost = cost;
    this.maxLevel = maxLevel;
    this.buildTime = buildTime;
    this.requirements = requirements;
  }

  getCost(level: number): Cost { 
    const timber = this.cost.timber * (1.26 ** level);
    const clay = this.cost.clay * (1.275 ** level);
    const iron = this.cost.iron * (1.25 ** level);
    let population = this.cost.population * (1.17 ** level);
    if (level > 0) {
      population -= this.cost.population * (1.17 ** (level - 1));
    }
    return { resources: { timber, clay, iron  }, population };
  }

  getBuildTime(buildingLevel: number, headquarterLevel: number): number {
    return this.buildTime * 1.18 * 1.2 ** (Math.max(-13, buildingLevel - 14 / buildingLevel)) * 1.05 ** (-headquarterLevel) / WorldSpeed;
  }
}
