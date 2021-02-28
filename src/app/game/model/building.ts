import { BuildingProps, BuildingRequirements, BuildingCost } from "../../../types/types";
import { BuildingId, WorldSpeed } from "../constants";

export class Building {
  id: BuildingId;
  name: string;
  description: string;
  cost: BuildingCost;
  maxLevel: number;
  buildTime: number;
  requirements: BuildingRequirements | undefined;

  constructor({
    id, name, description, cost, maxLevel, buildTime, requirements,
  }: BuildingProps) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.cost = cost;
    this.maxLevel = maxLevel;
    this.buildTime = buildTime;
    this.requirements = requirements;
  }

  getCost(level: number): BuildingCost {
    const timber = this.cost.resources.timber * (1.26 ** level);
    const clay = this.cost.resources.clay * (1.275 ** level);
    const iron = this.cost.resources.iron * (1.25 ** level);
    if (this.cost.population) {
      let population = this.cost.population * (1.17 ** level);
      if (level > 0) {
        population -= this.cost.population * (1.17 ** (level - 1));
      }
      return { resources: { timber, clay, iron }, population };
    }
    return { resources: { timber, clay, iron }, population: 0 };
  }

  getBuildTime(buildingLevel: number, headquarterLevel: number): number {
    return (this.buildTime * 1.18 * 1.2 ** (Math.max(-13, buildingLevel - 14 / buildingLevel)) * (1.05 ** (-headquarterLevel))) / WorldSpeed;
  }
}
