import { Building } from "./building";
import { UnitIdProductionType } from "../../constants";
import { BuildingProps } from "./types";

interface Props extends BuildingProps {
  researches: Array<UnitIdProductionType>;
}

export class ResearchBuilding extends Building {
  researches: Array<UnitIdProductionType>;

  constructor({
    id, name, description, cost, maxLevel, buildTime, researches,
  }: Props) {
    super({
      id, name, description, cost, maxLevel, buildTime,
    });
    this.researches = researches;
  }
}
