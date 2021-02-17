import { Building } from "./building";
import { UnitId } from "../constants";
import { UnitProductionBuildingProps } from "../../../types/types";

export class UnitProductionBuilding extends Building {
  creates: Array<UnitId>;

  constructor({ id, name, description, cost, maxLevel, buildTime, creates }: UnitProductionBuildingProps) {
    super({ id, name, description, cost, maxLevel, buildTime })
    this.creates = creates;
  }
}
