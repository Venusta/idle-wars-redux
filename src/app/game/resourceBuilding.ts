import { Building } from "./building";
import { ResourceBuildingProps, ResourceGenProps } from "./types";

export class ResourceBuilding extends Building {
  id: number;
  name: string;
  cost: any;
  maxLevel: number;
  buildTime: number;
  generate: ResourceGenProps;

  constructor({ id, name, cost, maxLevel, buildTime, generate }: ResourceBuildingProps) {
    super({ id, name, cost, maxLevel, buildTime })
    this.generate = generate;
  }
}
