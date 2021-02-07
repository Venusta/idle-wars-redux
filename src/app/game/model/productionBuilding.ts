import { Building } from "./building";
import { ProductionBuildingProps, ResourceGenProps } from "../../../types/types";

export class ProductionBuilding extends Building {
  creates: ResourceGenProps;

  constructor({ id, name, description, cost, maxLevel, buildTime, creates }: ProductionBuildingProps) {
    super({ id, name, description, cost, maxLevel, buildTime })
    this.creates = creates;
  }
}
