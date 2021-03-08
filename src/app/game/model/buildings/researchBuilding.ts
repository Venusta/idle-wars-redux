import { Building } from "./building";
import { ResearchBuildingProps } from "../../../../types/types";
import { UnitId } from "../../constants";

export class ResearchBuilding extends Building {
  researches: Array<UnitId>;

  constructor({
    id, name, description, cost, maxLevel, buildTime, researches,
  }: ResearchBuildingProps) {
    super({
      id, name, description, cost, maxLevel, buildTime,
    });
    this.researches = researches;
  }
}
