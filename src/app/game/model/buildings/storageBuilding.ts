import { Building } from "./building";
import { BuildingProps } from "../../../../types/types";

export class StorageBuilding extends Building {
  constructor({
    id, name, description, cost, maxLevel, buildTime,
  }: BuildingProps) {
    super({
      id, name, description, cost, maxLevel, buildTime,
    });
  }

  // todo move this function
  // eslint-disable-next-line class-methods-use-this
  getStorageCapacity(level: number): number {
    return 1000 * 1.2294934 ** level;
  }
}
