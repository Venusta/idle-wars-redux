import { Building } from "./building";
import { UnitIdProduction } from "../../constants";
import { BuildingProps } from "./types";

interface Props extends BuildingProps {
  researches: Array<UnitIdProduction>;
}

export class ResearchBuilding extends Building {
  researches: Array<UnitIdProduction>;

  constructor({
    id, name, description, cost, maxLevel, buildTime, researches,
  }: Props) {
    super({
      id, name, description, cost, maxLevel, buildTime,
    });
    this.researches = researches;
  }
}
