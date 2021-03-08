import { Building } from "./building";
import { BuildingProps } from "./types";

export class FarmBuilding extends Building {
  constructor({
    id, name, description, cost, maxLevel, buildTime,
  }: BuildingProps) {
    super({
      id, name, description, cost, maxLevel, buildTime,
    });
  }

  // todo move this function
  // eslint-disable-next-line class-methods-use-this
  getMaxPopulation(level: number): number {
    return 240 * 1.172103 ** level;
  }
}
