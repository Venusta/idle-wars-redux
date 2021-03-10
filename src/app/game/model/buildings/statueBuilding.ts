import { UnitIdStatueType } from "../../constants";
import { Building } from "./building";
import { BuildingProps } from "./types";

interface Props extends BuildingProps {
  creates: Array<UnitIdStatueType>;
}

export class StatueBuilding extends Building {
  creates: Array<UnitIdStatueType>;

  constructor({
    id, name, description, cost, maxLevel, buildTime, creates,
  }: Props) {
    super({
      id, name, description, cost, maxLevel, buildTime,
    });
    this.creates = creates;
  }
}
