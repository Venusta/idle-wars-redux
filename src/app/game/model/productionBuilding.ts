import { Building } from "./building";
import { ProductionBuildingProps } from "../../../types/types";
import { UnitId, BuildingId } from "../constants";

export class ProductionBuilding extends Building {
  creates: Array<UnitId | BuildingId>;

  constructor({ id, name, description, cost, maxLevel, buildTime, creates }: ProductionBuildingProps) {
    super({ id, name, description, cost, maxLevel, buildTime })
    this.creates = creates;
  }
}
