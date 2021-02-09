import { Building } from "./building";
import { BuildingProps} from "../../../types/types";

export class FarmBuilding extends Building {

  constructor({ id, name, description, cost, maxLevel, buildTime }: BuildingProps) {
    super({ id, name, description, cost, maxLevel, buildTime })
  }

  getMaxPopulation(level: number) {
    return 240 * 1.172103 ** level;
  }
}
