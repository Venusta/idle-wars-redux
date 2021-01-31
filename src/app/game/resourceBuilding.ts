import { Building } from "./building";
import { ResourceBuildingProps, ResourceGenProps } from "./types";

export class ResourceBuilding extends Building {
  generate: ResourceGenProps;

  constructor({ id, name, cost, maxLevel, buildTime, generate }: ResourceBuildingProps) {
    super({ id, name, cost, maxLevel, buildTime })
    this.generate = generate;
  }
}
