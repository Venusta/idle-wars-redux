import { BuildingProps } from "./types";

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
}
