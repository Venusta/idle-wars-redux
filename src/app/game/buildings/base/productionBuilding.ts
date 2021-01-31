import { Building } from "./building";
import { ProductionBuildingProps, ResourceGenProps } from "../../../../types/types";

export class ProductionBuilding extends Building {
  creates: ResourceGenProps;

  constructor({ id, name, cost, maxLevel, buildTime, creates }: ProductionBuildingProps) {
    super({ id, name, cost, maxLevel, buildTime })
    this.creates = creates;
  }
}
