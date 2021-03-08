/* eslint-disable arrow-body-style */
import { BuildingCost } from "../../../../types/townStateTypes";
import { multiplyResources } from "../../../util";
import { tupleToNormalisedResources } from "../../../util/tupleToNormalisedResources";
import { BuildingIdType, WorldSpeed } from "../../constants";
import { BuildingProps, BuildingRequirements } from "./types";

export class Building {
  id: BuildingIdType;
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

  getBuildTime(buildingLevel: number, headquarterLevel: number): number {
    return (this.buildTime * 1.18 * 1.2 ** (Math.max(-13, buildingLevel - 14 / buildingLevel)) * (1.05 ** (-headquarterLevel))) / WorldSpeed;
  }
}
