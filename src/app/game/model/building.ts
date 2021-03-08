/* eslint-disable arrow-body-style */
import { BuildingProps, BuildingRequirements } from "../../../types/types";
import { BuildingCost } from "../../../types/townStateTypes";
import { multiplyResources, tupleToNormalisedResources } from "../../util/normalisedZone";
import { BuildingId, WorldSpeed } from "../constants";

export class Building {
  id: BuildingId;
  name: string;
  description: string;
  private cost: BuildingCost;
  maxLevel: number;
  buildTime: number;
  requirements: BuildingRequirements | undefined;

  constructor({
    id, name, description, cost, maxLevel, buildTime, requirements,
  }: BuildingProps) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.cost = {
      population: cost.population,
      resources: tupleToNormalisedResources(cost.resources),
    };
    this.maxLevel = maxLevel;
    this.buildTime = buildTime;
    this.requirements = requirements;
  }

  getCost(level: number): BuildingCost {
    const resources = multiplyResources(this.cost.resources, (1.26 ** level));
    let population = this.cost.population * (1.17 ** level);
    if (level > 0) {
      population -= this.cost.population * (1.17 ** (level - 1));
    }
    return {
      resources,
      population,
    };
  }

  // getCost(level: number): BuildingCostTuple {
  //   // const resourceMod = 1.26;
  //   // const populationMod = 1.17;

  //   const resources: ResourcesTuple = this.cost.resources.map(([id, amount]) => [id, amount * (1.26 ** level)]);

  //   let population = this.cost.population * (1.17 ** level);
  //   if (level > 0) {
  //     population -= this.cost.population * (1.17 ** (level - 1));
  //   }
  //   return { resources, population };
  // }
  // const timber = this.cost.resources.timber * (1.26 ** level);
  // const clay = this.cost.resources.clay * (1.275 ** level);
  // const iron = this.cost.resources.iron * (1.25 ** level);

  getBuildTime(buildingLevel: number, headquarterLevel: number): number {
    return (this.buildTime * 1.18 * 1.2 ** (Math.max(-13, buildingLevel - 14 / buildingLevel)) * (1.05 ** (-headquarterLevel))) / WorldSpeed;
  }
}
