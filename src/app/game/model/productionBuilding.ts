import { Building } from "./building";
import { ProductionBuildingProps } from "../../../types/types";
import { BuildingId } from "../constants";

export class ProductionBuilding extends Building {
  creates: Array<BuildingId>;

  constructor({ id, name, description, cost, maxLevel, buildTime, creates }: ProductionBuildingProps) {
    super({ id, name, description, cost, maxLevel, buildTime })
    this.creates = creates;
  }
}
