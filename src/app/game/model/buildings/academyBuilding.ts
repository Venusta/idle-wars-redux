import { Building } from "./building";
import { UnitId } from "../../constants";
import { AcademyBuildingProps } from "../../../../types/types";

export class AcademyBuilding extends Building {
  creates: Array<UnitId>;

  constructor({
    id, name, description, cost, maxLevel, buildTime, creates,
  }: AcademyBuildingProps) {
    super({
      id, name, description, cost, maxLevel, buildTime,
    });
    this.creates = creates;
  }
}
