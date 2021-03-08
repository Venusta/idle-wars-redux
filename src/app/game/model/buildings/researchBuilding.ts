import { Building } from "./building";
import { UnitId } from "../../constants";
import { BuildingProps } from "./types";

interface Props extends BuildingProps {
  researches: Array<UnitId>;
}

export class ResearchBuilding extends Building {
  researches: Array<UnitId>;

  constructor({
    id, name, description, cost, maxLevel, buildTime, researches,
  }: Props) {
    super({
      id, name, description, cost, maxLevel, buildTime,
    });
    this.researches = researches;
  }
}
