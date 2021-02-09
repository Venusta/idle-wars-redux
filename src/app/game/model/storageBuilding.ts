import { Building } from "./building";
import { BuildingProps} from "../../../types/types";

export class StorageBuilding extends Building {

  constructor({ id, name, description, cost, maxLevel, buildTime }: BuildingProps) {
    super({ id, name, description, cost, maxLevel, buildTime })
  }

  getStorageCapacity(level: number) {
    return 1000 * 1.2294934 ** level;
  }
}
